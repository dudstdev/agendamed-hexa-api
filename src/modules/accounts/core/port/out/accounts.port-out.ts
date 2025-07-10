import { AccountEntity } from "@/accounts/core/domain";

export interface AccountsPortOut {
  findById(id: string): Promise<AccountEntity | null>;
  findByEmail(email: string): Promise<AccountEntity | null>;
  save(account: AccountEntity): Promise<void>;
  create(account: AccountEntity): Promise<void>;
}
