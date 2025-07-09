import { TokenEntity } from "@/accounts/core/domain";

export interface TokensPortOut {
  findByCode(code: string): Promise<TokenEntity | null>;
  create(token: TokenEntity): Promise<void>;
  delete(token: TokenEntity): Promise<void>;
}
