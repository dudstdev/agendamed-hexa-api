import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { RequestAccountConfirmationImplController } from "@/accounts/api/rest";
import { AccountConfirmationDTO } from "@/accounts/core/port/in";
import { Public } from "@/shared/infrastructure";

@ApiTags("Accounts")
@Controller("/accounts/confirmation/request")
@Public()
export class RequestAccountConfirmationController {
  constructor(
    private readonly requestAccountConfirmationImpl: RequestAccountConfirmationImplController,
  ) {}

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({
    summary: "Request account confirmation",
    description:
      "Requests an account confirmation by sending a confirmation code to the user's email.",
  })
  @ApiResponse({
    status: 202,
    description: "Confirmation code sent successfully.",
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
  async requestAccountConfirmation(
    @Body() body: AccountConfirmationDTO,
  ): Promise<void> {
    return this.requestAccountConfirmationImpl.execute(body);
  }
}
