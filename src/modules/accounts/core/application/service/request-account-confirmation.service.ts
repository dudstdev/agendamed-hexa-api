import { Inject } from "@nestjs/common";

import { TokenEntity, TokenType } from "@/accounts/core/domain";
import {
  AccountConfirmationRequestDTO,
  RequestAccountConfirmationPortIn,
} from "@/accounts/core/port/in";
import { AccountsPortOut, TokensPortOut } from "@/accounts/core/port/out";
import {
  AccountNotFoundException,
  AccountNotFoundFailure,
  Either,
  left,
  right,
} from "@/shared/exception";
import {
  AccountAlreadyConfirmedException,
  AccountAlreadyConfirmedFailure,
} from "@/shared/exception";
import { generateNumericPin } from "@/shared/utils";

export class RequestAccountConfirmationService
  implements RequestAccountConfirmationPortIn
{
  private readonly EXPIRATION_TIME_IN_MINUTES = 15 * 60 * 1000;

  constructor(
    @Inject("AccountsPortOut")
    private readonly accountsPortOut: AccountsPortOut,

    @Inject("TokensPortOut")
    private readonly tokensPortOut: TokensPortOut,
  ) {}

  async execute({
    email,
  }: AccountConfirmationRequestDTO): Promise<
    Either<AccountNotFoundException | AccountAlreadyConfirmedException, void>
  > {
    const account = await this.accountsPortOut.findByEmail(email);

    if (!account) {
      return left(
        new AccountNotFoundException({
          account: { email },
          message: AccountNotFoundFailure.ACCOUNT_NOT_FOUND_FAILURE,
        }),
      );
    }

    if (account.isEmailVerified) {
      return left(
        new AccountAlreadyConfirmedException({
          account: { email },
          message:
            AccountAlreadyConfirmedFailure.ACCOUNT_ALREADY_CONFIRMED_FAILURE,
        }),
      );
    }

    const confirmationToken = TokenEntity.create({
      accountId: account.id,
      code: generateNumericPin(8),
      type: TokenType.EMAIL_CONFIRMATION,
      expiresAt: new Date(Date.now() + this.EXPIRATION_TIME_IN_MINUTES),
    });

    await this.tokensPortOut.create(confirmationToken);

    return right(undefined);
  }
}
