import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { RefreshSessionImplController } from "@/sessions/api/rest";
import { RefreshSessionDTO } from "@/sessions/core/port/in";
import { SessionOutDTO } from "@/sessions/core/port/out";
import { Public } from "@/shared/infrastructure";

@ApiTags("Sessions")
@Controller("/sessions/refresh")
@Public()
export class RefreshSessionController {
  constructor(
    private readonly refreshSessionImpl: RefreshSessionImplController,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Refresh session tokens",
    description:
      "Generates new access and refresh tokens using a valid refresh token.",
  })
  @ApiResponse({
    status: 200,
    description: "Tokens refreshed successfully.",
    type: SessionOutDTO,
  })
  @ApiResponse({
    status: 400,
    description: "Missing or invalid refresh token format.",
  })
  @ApiResponse({
    status: 401,
    description: "Invalid or expired refresh token.",
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error.",
  })
  async refreshSession(
    @Body() body: RefreshSessionDTO,
  ): Promise<SessionOutDTO> {
    return this.refreshSessionImpl.execute(body);
  }
}
