import { Injectable } from "@nestjs/common";

import { AccountEntity } from "@/accounts/core/domain";
import { AccountsPortOut } from "@/accounts/core/port/out";
import { PrismaAccountMapper } from "@/accounts/infrastructure/persistence";
import { PrismaService } from "@/shared/infrastructure";

@Injectable()
export class PrismaAccountsRepository implements AccountsPortOut {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<AccountEntity | null> {
    const account = await this.prisma.account.findUnique({
      where: { id },
    });

    if (!account) return null;

    return PrismaAccountMapper.toDomain(account);
  }

  async findByEmail(email: string): Promise<AccountEntity | null> {
    const account = await this.prisma.account.findUnique({
      where: { email },
    });

    if (!account) return null;

    return PrismaAccountMapper.toDomain(account);
  }

  async save(account: AccountEntity): Promise<void> {
    const data = PrismaAccountMapper.toPrisma(account);

    await this.prisma.account.update({
      where: { id: account.id.toString() },
      data,
    });
  }

  async create(account: AccountEntity): Promise<void> {
    const data = PrismaAccountMapper.toPrisma(account);

    await this.prisma.account.create({ data });
  }
}
