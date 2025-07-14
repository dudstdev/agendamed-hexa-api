import { Inject } from "@nestjs/common";

import { TokenEntity, TokenType } from "@/accounts/core/domain";
import {
  PasswordResetRequestDTO,
  RequestPasswordResetPortIn,
} from "@/accounts/core/port/in";
import { AccountsPortOut, TokensPortOut } from "@/accounts/core/port/out";
import {
  AccountNotFoundException,
  AccountNotFoundFailure,
  Either,
  left,
  right,
} from "@/shared/exception";
import { generateNumericPin } from "@/shared/utils";

export class RequestPasswordResetService implements RequestPasswordResetPortIn {
  private readonly EXPIRATION_TIME_IN_MINUTES = 15 * 60 * 1000;

  constructor(
    @Inject("AccountsPortOut")
    private readonly accountsPortOut: AccountsPortOut,

    @Inject("TokensPortOut")
    private readonly tokensPortOut: TokensPortOut,
  ) {}

  async execute({
    email,
  }: PasswordResetRequestDTO): Promise<Either<AccountNotFoundException, void>> {
    const account = await this.accountsPortOut.findByEmail(email);

    if (!account) {
      return left(
        new AccountNotFoundException({
          account: {},
          message: AccountNotFoundFailure.ACCOUNT_NOT_FOUND_FAILURE,
        }),
      );
    }

    const confirmationToken = TokenEntity.create({
      accountId: account.id,
      code: generateNumericPin(8),
      type: TokenType.PASSWORD_RESET,
      expiresAt: new Date(Date.now() + this.EXPIRATION_TIME_IN_MINUTES),
    });

    await this.tokensPortOut.create(confirmationToken);

    return right(undefined);
  }
}
