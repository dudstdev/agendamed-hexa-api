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
import { Either, left, right } from "@/shared/exception";
import {
  AccountAlreadyExistsException,
  AccountAlreadyExistsFailure,
} from "@/shared/exception/accounts/account-already-exists.exception";

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
  }: AccountRequestDTO): Promise<
    Either<AccountAlreadyExistsException, AccountResponseDTO>
  > {
    const accountWithSameEmail = await this.accountsPortOut.findByEmail(email);

    if (accountWithSameEmail) {
      return left(
        new AccountAlreadyExistsException({
          account: { email },
          message: AccountAlreadyExistsFailure.ACCOUNT_ALREADY_EXISTS_FAILURE,
        }),
      );
    }

    const hashedPassword = await this.hashGeneratorPortOut.hash(password);

    const account = AccountEntity.create({
      email,
      password: hashedPassword,
    });

    await this.accountsPortOut.create(account);

    return right({
      id: account.id.toString(),
      email: account.email,
      isEmailVerified: account.isEmailVerified,
      createdAt: account.createdAt.toISOString(),
      updatedAt: account.updatedAt?.toISOString() ?? null,
    });
  }
}
