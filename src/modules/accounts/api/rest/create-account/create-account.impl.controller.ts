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

  async handle(request: AccountRequestDTO): Promise<AccountResponseDTO> {
    const response = await this.createAccountService.execute(request);

    if (response.isLeft()) {
      throw response.value;
    }

    return response.value;
  }
}
