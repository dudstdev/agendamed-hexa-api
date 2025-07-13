import { Inject, Injectable } from "@nestjs/common";

import {
  PasswordResetRequestDTO,
  RequestPasswordResetPortIn,
} from "@/accounts/core/port/in";

@Injectable()
export class RequestPasswordResetImplController {
  constructor(
    @Inject("RequestPasswordResetPortIn")
    private readonly requestPasswordResetService: RequestPasswordResetPortIn,
  ) {}

  async execute(request: PasswordResetRequestDTO): Promise<void> {
    return this.requestPasswordResetService.execute(request);
  }
}
