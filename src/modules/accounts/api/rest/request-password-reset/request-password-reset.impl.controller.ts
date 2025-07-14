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

  async handle(request: PasswordResetRequestDTO): Promise<void> {
    const response = await this.requestPasswordResetService.execute(request);

    if (response.isLeft()) {
      throw response.value;
    }
  }
}
