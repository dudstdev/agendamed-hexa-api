import { Inject } from "@nestjs/common";

import {
  ConfirmAccountDTO,
  ConfirmAccountPortIn,
} from "@/accounts/core/port/in";
import { AccountResponseDTO } from "@/accounts/core/port/out";

export class ConfirmAccountImplController {
  constructor(
    @Inject("ConfirmAccountPortIn")
    private readonly confirmAccountService: ConfirmAccountPortIn,
  ) {}

  async execute(request: ConfirmAccountDTO): Promise<AccountResponseDTO> {
    return this.confirmAccountService.execute(request);
  }
}
