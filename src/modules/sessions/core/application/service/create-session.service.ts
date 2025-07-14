import { Inject } from "@nestjs/common";

import { AccountsPortOut } from "@/accounts/core/port/out";
import { SessionEntity } from "@/sessions/core/domain";
import {
  CreateSessionPortIn,
  SessionRequestDTO,
} from "@/sessions/core/port/in";
import {
  EncrypterPortOut,
  HashComparerPortOut,
  SessionOutResponseDTO,
  SessionsPortOut,
} from "@/sessions/core/port/out";
import {
  Either,
  left,
  right,
  UnverifiedAccountException,
  UnverifiedAccountFailure,
  WrongCredentialsException,
  WrongCredentialsFailure,
} from "@/shared/exception";

export class CreateSessionService implements CreateSessionPortIn {
  private readonly ACCESS_TOKEN_EXPIRATION = "15m";
  private readonly REFRESH_TOKEN_EXPIRATION = "30d";
  private readonly SESSION_EXPIRATION_DAYS = 30 * 24 * 60 * 60 * 1000;

  constructor(
    @Inject("AccountsPortOut")
    private readonly accountsPortOut: AccountsPortOut,

    @Inject("HashComparerPortOut")
    private readonly hashComparerPortOut: HashComparerPortOut,

    @Inject("EncrypterPortOut")
    private readonly encrypterPortOut: EncrypterPortOut,

    @Inject("SessionsPortOut")
    private readonly sessionsPortOut: SessionsPortOut,
  ) {}

  async execute({
    email,
    password,
    clientId,
    ipAddress,
    userAgent,
  }: SessionRequestDTO): Promise<
    Either<
      WrongCredentialsException | UnverifiedAccountException,
      SessionOutResponseDTO
    >
  > {
    const account = await this.accountsPortOut.findByEmail(email);

    if (!account) {
      return left(
        new WrongCredentialsException(
          WrongCredentialsFailure.WRONG_CREDENTIALS,
        ),
      );
    }

    if (!account.isEmailVerified) {
      return left(
        new UnverifiedAccountException({
          account: { email },
          message: UnverifiedAccountFailure.UNVERIFIED_ACCOUNT,
        }),
      );
    }

    const isPasswordValid = await this.hashComparerPortOut.compare(
      password,
      account.password,
    );

    if (!isPasswordValid) {
      return left(
        new WrongCredentialsException(
          WrongCredentialsFailure.WRONG_CREDENTIALS,
        ),
      );
    }

    const existingSession =
      await this.sessionsPortOut.findByAccountIdAndClientId(
        account.id.toString(),
        clientId,
      );

    if (existingSession) {
      await this.sessionsPortOut.revoke(existingSession.id.toString());
    }

    const refreshToken = await this.encrypterPortOut.encrypt(
      { sub: account.id.toString(), type: "refresh-token" },
      { expiresIn: this.REFRESH_TOKEN_EXPIRATION },
    );

    const accessToken = await this.encrypterPortOut.encrypt(
      { sub: account.id.toString() },
      { expiresIn: this.ACCESS_TOKEN_EXPIRATION },
    );

    const session = SessionEntity.create({
      accountId: account.id,
      refreshToken,
      clientId,
      expiresAt: new Date(Date.now() + this.SESSION_EXPIRATION_DAYS),
      ipAddress,
      userAgent,
    });

    await this.sessionsPortOut.create(session);

    return right({
      refreshToken,
      accessToken,
    });
  }
}
