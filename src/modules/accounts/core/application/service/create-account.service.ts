import { Inject } from "@nestjs/common";

import { AccountEntity } from "@/accounts/core/domain";
import {
  AccountRequestDTO,
  CreateAccountPortIn,
} from "@/accounts/core/port/in";
import {
  AccountResponseDTO,
  AccountsPortOut,
  HashGeneratorPortOut,
} from "@/accounts/core/port/out";

export class CreateAccountService implements CreateAccountPortIn {
  constructor(
    @Inject("AccountsPortOut")
    private readonly accountsPortOut: AccountsPortOut,

    @Inject("HashGeneratorPortOut")
    private readonly hashGeneratorPortOut: HashGeneratorPortOut,
  ) {}

  async execute({
    email,
    password,
  }: AccountRequestDTO): Promise<AccountResponseDTO> {
    const accountWithSameEmail = await this.accountsPortOut.findByEmail(email);

    if (accountWithSameEmail) {
      throw new Error("Business Exception");
    }

    const hashedPassword = await this.hashGeneratorPortOut.hash(password);

    const account = AccountEntity.create({
      email,
      password: hashedPassword,
    });

    await this.accountsPortOut.create(account);

    return {
      id: account.id.toString(),
      email: account.email,
      isEmailVerified: account.isEmailVerified,
      createdAt: account.createdAt.toISOString(),
      updatedAt: account.updatedAt?.toISOString() ?? null,
    };
  }
}
