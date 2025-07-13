import { Body, Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { GetSessionsImplController } from "@/sessions/api/rest";
import { SessionsRequestDTO } from "@/sessions/core/port/in";
import { SessionsOutResponseDTO } from "@/sessions/core/port/out";
import { Public } from "@/shared/infrastructure";

@ApiTags("Sessions")
@Controller("/sessions")
@Public()
export class GetSessionsController {
  constructor(private readonly getSessionsImpl: GetSessionsImplController) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get active sessions",
    description: "Returns a list of active sessions for the given accountId.",
  })
  @ApiResponse({
    status: 200,
    description: "List of sessions retrieved successfully.",
    type: SessionsOutResponseDTO,
  })
  @ApiResponse({
    status: 400,
    description: "Invalid accountId format.",
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error.",
  })
  async getSessions(
    @Body() body: SessionsRequestDTO,
  ): Promise<SessionsOutResponseDTO[]> {
    return this.getSessionsImpl.handle(body);
  }
}
