import { Inject } from "@nestjs/common";

import { TokenType } from "@/accounts/core/domain";
import {
  ConfirmAccountPortIn,
  ConfirmAccountRequestDTO,
} from "@/accounts/core/port/in";
import {
  AccountResponseDTO,
  AccountsPortOut,
  TokensPortOut,
} from "@/accounts/core/port/out";
import {
  AccountAlreadyConfirmedException,
  AccountAlreadyConfirmedFailure,
  AccountNotFoundException,
  AccountNotFoundFailure,
  Either,
  InvalidOrExpiredTokenException,
  InvalidOrExpiredTokenFailure,
  left,
  right,
  TokenNotFoundException,
  TokenNotFoundFailure,
} from "@/shared/exception";

export class ConfirmAccountService implements ConfirmAccountPortIn {
  constructor(
    @Inject("TokensPortOut")
    private readonly tokensPortOut: TokensPortOut,

    @Inject("AccountsPortOut")
    private readonly accountsPortOut: AccountsPortOut,
  ) {}

  async execute({
    code,
  }: ConfirmAccountRequestDTO): Promise<
    Either<
      | TokenNotFoundException
      | InvalidOrExpiredTokenException
      | AccountNotFoundException
      | AccountAlreadyConfirmedException,
      AccountResponseDTO
    >
  > {
    const confirmationCode = await this.tokensPortOut.findByCode(code);

    if (!confirmationCode) {
      return left(
        new TokenNotFoundException({
          token: { code },
          message: TokenNotFoundFailure.TOKEN_NOT_FOUND_FAILURE,
        }),
      );
    }

    if (confirmationCode.isExpired()) {
      return left(
        new InvalidOrExpiredTokenException({
          token: { code },
          message:
            InvalidOrExpiredTokenFailure.INVALID_OR_EXPIRED_TOKEN_FAILURE,
        }),
      );
    }

    if (confirmationCode.type !== TokenType.EMAIL_CONFIRMATION) {
      return left(
        new InvalidOrExpiredTokenException({
          token: { code },
          message:
            InvalidOrExpiredTokenFailure.INVALID_OR_EXPIRED_TOKEN_FAILURE,
        }),
      );
    }

    const account = await this.accountsPortOut.findById(
      confirmationCode.accountId.toString(),
    );

    if (!account) {
      return left(
        new AccountNotFoundException({
          account: {},
          message: AccountNotFoundFailure.ACCOUNT_NOT_FOUND_FAILURE,
        }),
      );
    }

    if (account.isEmailVerified) {
      return left(
        new AccountAlreadyConfirmedException({
          account: { email: account.email },
          message:
            AccountAlreadyConfirmedFailure.ACCOUNT_ALREADY_CONFIRMED_FAILURE,
        }),
      );
    }

    account.isEmailVerified = true;

    await this.accountsPortOut.save(account);
    await this.tokensPortOut.delete(confirmationCode);

    return right({
      id: account.id.toString(),
      email: account.email,
      isEmailVerified: account.isEmailVerified,
      createdAt: account.createdAt.toISOString(),
      updatedAt: account.updatedAt?.toISOString() ?? null,
    });
  }
}
