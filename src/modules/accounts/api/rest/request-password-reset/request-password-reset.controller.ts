import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { RequestPasswordResetImplController } from "@/accounts/api/rest";
import { PasswordResetRequestDTO } from "@/accounts/core/port/in";
import { Public } from "@/shared/infrastructure";

@ApiTags("Accounts")
@Controller("/accounts/password-reset/request")
@Public()
export class RequestPasswordResetController {
  constructor(
    private readonly requestPasswordResetImpl: RequestPasswordResetImplController,
  ) {}

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({
    summary: "Request password reset",
    description:
      "Requests a password reset by sending a reset code to the user's email.",
  })
  @ApiResponse({
    status: 202,
    description: "Password reset request accepted and will be processed.",
  })
  @ApiResponse({
    status: 400,
    description: "Bad request. The email may be invalid or missing.",
  })
  @ApiResponse({
    status: 404,
    description: "Account not found with the provided email.",
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error.",
  })
  async requestPasswordReeset(
    @Body() body: PasswordResetRequestDTO,
  ): Promise<void> {
    return this.requestPasswordResetImpl.execute(body);
  }
}
