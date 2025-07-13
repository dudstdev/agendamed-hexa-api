import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { EncrypterPortOut } from "@/sessions/core/port/out";

@Injectable()
export class JwtEncrypter implements EncrypterPortOut {
  constructor(private readonly jwtService: JwtService) {}

  encrypt(
    payload: Record<string, unknown>,
    options?: { expiresIn?: string | number },
  ): Promise<string> {
    return this.jwtService.signAsync(payload, {
      ...(options ?? {}),
    });
  }
}
