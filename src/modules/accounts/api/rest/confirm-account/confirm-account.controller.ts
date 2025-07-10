import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

import { ConfirmAccountDTO } from "@/accounts/core/port/in";
import { AccountResponseDTO } from "@/accounts/core/port/out";
import { Public } from "@/shared/infrastructure";

import { ConfirmAccountImplController } from "./confirm-account.impl.controller";

@ApiTags("Accounts")
@Controller("/accounts/confirmation/confirm")
@Public()
export class ConfirmAccountController {
  constructor(
    private readonly confirmAccountImpl: ConfirmAccountImplController,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: "Account confirmed successfully.",
    type: AccountResponseDTO,
  })
  @ApiResponse({
    status: 400,
    description: "Invalid or missing confirmation code.",
  })
  @ApiResponse({
    status: 401,
    description: "Invalid, expired, or already used confirmation code.",
  })
  @ApiResponse({
    status: 409,
    description: "Account already verified.",
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error.",
  })
  async confirmAccount(
    @Body() body: ConfirmAccountDTO,
  ): Promise<AccountResponseDTO> {
    return this.confirmAccountImpl.execute(body);
  }
}
