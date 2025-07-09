import { Inject } from "@nestjs/common";

import { TokenEntity, TokenType } from "@/accounts/core/domain";
import {
  AccountConfirmationDTO,
  RequestAccountConfirmationPortIn,
} from "@/accounts/core/port/in";
import { AccountsPortOut, TokensPortOut } from "@/accounts/core/port/out";
import { generateNumericPin } from "@/shared/utils";

export class RequestAccountConfirmationService
  implements RequestAccountConfirmationPortIn
{
  private readonly EXPIRATION_TIME_IN_MINUTES = 15;

  constructor(
    @Inject("AccountsPortOut")
    private readonly accountsPortOut: AccountsPortOut,

    @Inject("TokensPortOut")
    private readonly tokensPortOut: TokensPortOut,
  ) {}

  async execute({ email }: AccountConfirmationDTO): Promise<void> {
    const account = await this.accountsPortOut.findByEmail(email);

    if (!account) {
      throw new Error("Business Exception");
    }

    const confirmationToken = TokenEntity.create({
      accountId: account.id,
      code: generateNumericPin(8),
      type: TokenType.EMAIL_CONFIRMATION,
      expiresAt: new Date(Date.now() + this.EXPIRATION_TIME_IN_MINUTES),
    });

    await this.tokensPortOut.create(confirmationToken);
  }
}
