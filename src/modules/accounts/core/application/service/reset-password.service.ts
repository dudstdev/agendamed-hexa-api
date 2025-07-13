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

export class ResetPasswordService implements ResetPasswordPortIn {
  constructor(
    @Inject("TokensPortOut")
    private readonly tokensPortOut: TokensPortOut,

    @Inject("AccountsPortOut")
    private readonly accountsPortOut: AccountsPortOut,

    @Inject("HashGeneratorPortOut")
    private readonly hashGeneratorPortOut: HashGeneratorPortOut,
  ) {}

  async execute({ code, newPassword }: ResetPasswordRequestDTO): Promise<void> {
    const resetToken = await this.tokensPortOut.findByCode(code);

    if (!resetToken) {
      throw new Error("Unauthorized");
    }

    if (resetToken.isExpired()) {
      throw new Error("Unauthorized");
    }

    if (resetToken.type !== TokenType.PASSWORD_RESET) {
      throw new Error("Unauthorized");
    }

    const account = await this.accountsPortOut.findById(
      resetToken.accountId.toString(),
    );

    if (!account) {
      throw new Error("Unauthorized");
    }

    const hashedPassword = await this.hashGeneratorPortOut.hash(newPassword);

    account.password = hashedPassword;

    await this.accountsPortOut.save(account);
    await this.tokensPortOut.delete(resetToken);
  }
}
