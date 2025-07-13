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

export class ConfirmAccountService implements ConfirmAccountPortIn {
  constructor(
    @Inject("TokensPortOut")
    private readonly tokensPortOut: TokensPortOut,

    @Inject("AccountsPortOut")
    private readonly accountsPortOut: AccountsPortOut,
  ) {}

  async execute({
    code,
  }: ConfirmAccountRequestDTO): Promise<AccountResponseDTO> {
    const confirmationCode = await this.tokensPortOut.findByCode(code);

    if (!confirmationCode) {
      throw new Error("Unauthorized");
    }

    if (confirmationCode.isExpired()) {
      throw new Error("Unauthorized");
    }

    if (confirmationCode.type !== TokenType.EMAIL_CONFIRMATION) {
      throw new Error("Unauthorized");
    }

    const account = await this.accountsPortOut.findById(
      confirmationCode.accountId.toString(),
    );

    if (!account) {
      throw new Error("Unauthorized");
    }

    if (account.isEmailVerified) {
      throw new Error("Business Exception");
    }

    account.isEmailVerified = true;

    await this.accountsPortOut.save(account);
    await this.tokensPortOut.delete(confirmationCode);

    return {
      id: account.id.toString(),
      email: account.email,
      isEmailVerified: account.isEmailVerified,
      createdAt: account.createdAt.toISOString(),
      updatedAt: account.updatedAt?.toISOString() ?? null,
    };
  }
}
