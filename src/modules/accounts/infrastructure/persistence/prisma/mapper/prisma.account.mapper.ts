import { Injectable } from "@nestjs/common";
import { Account as PrismaAccount, Prisma } from "@prisma/client";

import { AccountEntity } from "@/accounts/core/domain";
import { UniqueEntityID } from "@/shared/domain";

@Injectable()
export class PrismaAccountMapper {
  static toDomain(raw: PrismaAccount): AccountEntity {
    return AccountEntity.create(
      {
        email: raw.email,
        password: raw.password,
        isEmailVerified: raw.isEmailVerified,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(account: AccountEntity): Prisma.AccountUncheckedCreateInput {
    return {
      id: account.id.toString(),
      email: account.email,
      password: account.password,
      isEmailVerified: account.isEmailVerified,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt,
    };
  }
}
