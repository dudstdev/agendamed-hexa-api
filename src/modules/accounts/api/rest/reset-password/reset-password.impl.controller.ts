import { Inject, Injectable } from "@nestjs/common";

import {
  ResetPasswordPortIn,
  ResetPasswordRequestDTO,
} from "@/accounts/core/port/in";

@Injectable()
export class ResetPasswordImplController {
  constructor(
    @Inject("ResetPasswordPortIn")
    private readonly resetPasswordService: ResetPasswordPortIn,
  ) {}

  async handle(request: ResetPasswordRequestDTO): Promise<void> {
    const response = await this.resetPasswordService.execute(request);

    if (response.isLeft()) {
      throw response.value;
    }

    return response.value;
  }
}
