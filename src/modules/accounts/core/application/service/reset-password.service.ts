import { Inject } from "@nestjs/common";

import { TokenType } from "@/accounts/core/domain";
import {
  ResetPasswordPortIn,
  ResetPasswordRequestDTO,
} from "@/accounts/core/port/in";
import {
  AccountsPortOut,
  HashGeneratorPortOut,
  TokensPortOut,
} from "@/accounts/core/port/out";
import {
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

export class ResetPasswordService implements ResetPasswordPortIn {
  constructor(
    @Inject("TokensPortOut")
    private readonly tokensPortOut: TokensPortOut,

    @Inject("AccountsPortOut")
    private readonly accountsPortOut: AccountsPortOut,

    @Inject("HashGeneratorPortOut")
    private readonly hashGeneratorPortOut: HashGeneratorPortOut,
  ) {}

  async execute({
    code,
    newPassword,
  }: ResetPasswordRequestDTO): Promise<
    Either<
      | TokenNotFoundException
      | InvalidOrExpiredTokenException
      | AccountNotFoundException,
      void
    >
  > {
    const resetToken = await this.tokensPortOut.findByCode(code);

    if (!resetToken) {
      return left(
        new TokenNotFoundException({
          token: { code },
          message: TokenNotFoundFailure.TOKEN_NOT_FOUND_FAILURE,
        }),
      );
    }

    if (resetToken.isExpired()) {
      return left(
        new InvalidOrExpiredTokenException({
          token: { code },
          message:
            InvalidOrExpiredTokenFailure.INVALID_OR_EXPIRED_TOKEN_FAILURE,
        }),
      );
    }

    if (resetToken.type !== TokenType.PASSWORD_RESET) {
      return left(
        new InvalidOrExpiredTokenException({
          token: { code },
          message:
            InvalidOrExpiredTokenFailure.INVALID_OR_EXPIRED_TOKEN_FAILURE,
        }),
      );
    }

    const account = await this.accountsPortOut.findById(
      resetToken.accountId.toString(),
    );

    if (!account) {
      return left(
        new AccountNotFoundException({
          account: {},
          message: AccountNotFoundFailure.ACCOUNT_NOT_FOUND_FAILURE,
        }),
      );
    }

    const hashedPassword = await this.hashGeneratorPortOut.hash(newPassword);

    account.password = hashedPassword;

    await this.accountsPortOut.save(account);
    await this.tokensPortOut.delete(resetToken);

    return right(undefined);
  }
}
