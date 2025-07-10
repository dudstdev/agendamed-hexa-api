import { Inject, Injectable } from "@nestjs/common";

import {
  PasswordResetDTO,
  RequestPasswordResetPortIn,
} from "@/accounts/core/port/in";

@Injectable()
export class RequestPasswordResetImplController {
  constructor(
    @Inject("RequestPasswordResetPortIn")
    private readonly requestPasswordResetService: RequestPasswordResetPortIn,
  ) {}

  async execute(request: PasswordResetDTO): Promise<void> {
    return this.requestPasswordResetService.execute(request);
  }
}
