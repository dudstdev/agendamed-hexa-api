import { Injectable } from "@nestjs/common";
import { hash } from "bcryptjs";

import { HashGeneratorPortOut } from "@/accounts/core/port/out";

@Injectable()
export class BcryptHashGenerator implements HashGeneratorPortOut {
  private readonly HASH_SALT_ROUNDS = 10;

  async hash(plain: string): Promise<string> {
    return await hash(plain, this.HASH_SALT_ROUNDS);
  }
}
