import { Inject, Injectable } from "@nestjs/common";

import { ResetPasswordDTO, ResetPasswordPortIn } from "@/accounts/core/port/in";

@Injectable()
export class ResetPasswordImplController {
  constructor(
    @Inject("ResetPasswordPortIn")
    private readonly resetPasswordService: ResetPasswordPortIn,
  ) {}

  async execute(request: ResetPasswordDTO): Promise<void> {
    return this.resetPasswordService.execute(request);
  }
}
