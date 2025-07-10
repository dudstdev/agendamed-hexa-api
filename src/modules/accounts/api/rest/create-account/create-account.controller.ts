import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { CreateAccountImplController } from "@/accounts/api/rest/";
import { AccountRequestDTO } from "@/accounts/core/port/in";
import { AccountResponseDTO } from "@/accounts/core/port/out";
import { Public } from "@/shared/infrastructure";

@ApiTags("Accounts")
@Controller("/accounts")
@Public()
export class CreateAccountController {
  constructor(
    private readonly createAccountImpl: CreateAccountImplController,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Create a new account",
    description: "Creates a new account with the provided email and password.",
  })
  @ApiResponse({
    status: 201,
    description: "Successfully created account.",
    type: AccountResponseDTO,
  })
  @ApiResponse({
    status: 400,
    description:
      "Validation failed. Invalid email format or password does not meet security requirements (minimum 8 characters with uppercase, lowercase, number and symbol).",
  })
  @ApiResponse({
    status: 409,
    description: "Email already exists.",
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error.",
  })
  async createAccount(
    @Body() body: AccountRequestDTO,
  ): Promise<AccountResponseDTO> {
    return this.createAccountImpl.execute(body);
  }
}
