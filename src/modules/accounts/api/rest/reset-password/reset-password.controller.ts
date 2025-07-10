import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { ResetPasswordImplController } from "@/accounts/api/rest";
import { ResetPasswordDTO } from "@/accounts/core/port/in";
import { Public } from "@/shared/infrastructure";

@ApiTags("Accounts")
@Controller("/accounts/password-reset/reset")
@Public()
export class ResetPasswordController {
  constructor(
    private readonly resetPasswordImpl: ResetPasswordImplController,
  ) {}

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: "Reset password",
    description:
      "Resets the user's password using the provided reset code and new password.",
  })
  @ApiResponse({
    status: 204,
    description: "Password reset successfully.",
  })
  @ApiResponse({
    status: 400,
    description: "Invalid password format or missing required fields.",
  })
  @ApiResponse({
    status: 401,
    description: "Invalid, expired, or already used reset code.",
  })
  @ApiResponse({
    status: 404,
    description: "Account not found with the provided email.",
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error.",
  })
  async resetPassword(@Body() body: ResetPasswordDTO): Promise<void> {
    return this.resetPasswordImpl.execute(body);
  }
}
