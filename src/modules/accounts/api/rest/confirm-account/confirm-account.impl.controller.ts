import { Inject } from "@nestjs/common";

import {
  ConfirmAccountPortIn,
  ConfirmAccountRequestDTO,
} from "@/accounts/core/port/in";
import { AccountResponseDTO } from "@/accounts/core/port/out";

export class ConfirmAccountImplController {
  constructor(
    @Inject("ConfirmAccountPortIn")
    private readonly confirmAccountService: ConfirmAccountPortIn,
  ) {}

  async handle(request: ConfirmAccountRequestDTO): Promise<AccountResponseDTO> {
    return this.confirmAccountService.execute(request);
  }
}
