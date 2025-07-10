import { Inject, Injectable } from "@nestjs/common";

import {
  AccountRequestDTO,
  CreateAccountPortIn,
} from "@/accounts/core/port/in";
import { AccountResponseDTO } from "@/accounts/core/port/out";

@Injectable()
export class CreateAccountImplController {
  constructor(
    @Inject("CreateAccountPortIn")
    private readonly createAccountService: CreateAccountPortIn,
  ) {}

  async execute(request: AccountRequestDTO): Promise<AccountResponseDTO> {
    return this.createAccountService.execute(request);
  }
}
