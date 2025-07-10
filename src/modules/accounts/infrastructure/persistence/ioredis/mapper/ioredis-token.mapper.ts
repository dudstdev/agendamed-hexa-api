import { TokenEntity, TokenType } from "@/accounts/core/domain";
import { UniqueEntityID } from "@/shared/domain";

export type RedisTokenRaw = {
  id: string;
  accountId: string;
  code: string;
  type: TokenType;
  expiresAt: string;
};

export class RedisTokenMapper {
  static toDomain(raw: RedisTokenRaw): TokenEntity {
    return TokenEntity.create(
      {
        accountId: new UniqueEntityID(raw.accountId),
        code: raw.code,
        type: raw.type,
        expiresAt: new Date(raw.expiresAt),
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toRedis(token: TokenEntity): RedisTokenRaw {
    return {
      id: token.id.toString(),
      accountId: token.accountId.toString(),
      code: token.code,
      type: token.type,
      expiresAt: new Date(token.expiresAt).toISOString(),
    };
  }
}
