import { Inject } from "@nestjs/common";

import { AccountsPortOut } from "@/accounts/core/port/out";
import { SessionEntity } from "@/sessions/core/domain";
import { CreateSessionPortIn, SessionDTO } from "@/sessions/core/port/in";
import {
  EncrypterPortOut,
  HashComparerPortOut,
  SessionOutDTO,
  SessionsPortOut,
} from "@/sessions/core/port/out";

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
  }: SessionDTO): Promise<SessionOutDTO> {
    const account = await this.accountsPortOut.findByEmail(email);

    if (!account) {
      throw new Error("Unauthorized");
    }

    if (!account.isEmailVerified) {
      throw new Error("Business Exception");
    }

    const isPasswordValid = await this.hashComparerPortOut.compare(
      password,
      account.password,
    );

    if (!isPasswordValid) {
      throw new Error("Unauthorized");
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

    return {
      refreshToken,
      accessToken,
    };
  }
}
