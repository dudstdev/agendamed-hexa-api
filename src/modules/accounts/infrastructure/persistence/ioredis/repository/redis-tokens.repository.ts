import { Injectable } from "@nestjs/common";

import { TokenEntity } from "@/accounts/core/domain";
import { TokensPortOut } from "@/accounts/core/port/out";
import {
  RedisTokenMapper,
  RedisTokenRaw,
} from "@/accounts/infrastructure/persistence";
import { RedisService } from "@/shared/infrastructure";

@Injectable()
export class RedisTokensRepository implements TokensPortOut {
  private readonly EXPIRATION_TIME_IN_MINUTES = 15 * 60 * 1000;

  constructor(private readonly redis: RedisService) {}

  private getRedisKey(code: string): string {
    return `pin:${code}`;
  }

  async findByCode(code: string): Promise<TokenEntity | null> {
    const token = await this.redis.get(this.getRedisKey(code));

    if (!token) return null;

    const tokenData = JSON.parse(token) as RedisTokenRaw;
    return RedisTokenMapper.toDomain(tokenData);
  }

  async create(token: TokenEntity): Promise<void> {
    const redisKey = this.getRedisKey(token.code);
    const redisValue = RedisTokenMapper.toRedis(token);

    await this.redis.set(
      redisKey,
      JSON.stringify(redisValue),
      "EX",
      this.EXPIRATION_TIME_IN_MINUTES,
    );
  }

  async delete(token: TokenEntity): Promise<void> {
    await this.redis.del(this.getRedisKey(token.code));
  }
}
