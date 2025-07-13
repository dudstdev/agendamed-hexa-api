import { compare } from "bcryptjs";

import { HashComparerPortOut } from "@/sessions/core/port/out";

export class BcryptHashComparer implements HashComparerPortOut {
  compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash);
  }
}
