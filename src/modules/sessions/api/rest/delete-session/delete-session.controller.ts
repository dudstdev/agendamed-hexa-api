import { Body, Controller, Delete, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

import { DeleteSessionImplController } from "@/sessions/api/rest";
import { DeleteSessionDTO } from "@/sessions/core/port/in";

@ApiTags("Sessions")
@Controller("/sessions")
export class DeleteSessionController {
  constructor(
    private readonly deleteSessionImpl: DeleteSessionImplController,
  ) {}

  @Delete("")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: "Delete a session",
    description: "Revokes a session by its ID.",
  })
  @ApiParam({
    name: "sessionId",
    required: true,
    description: "The ID of the session to be revoked.",
  })
  @ApiResponse({
    status: 204,
    description: "Session revoked successfully.",
  })
  @ApiResponse({
    status: 404,
    description: "Session not found.",
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error.",
  })
  async delete(@Body() body: DeleteSessionDTO): Promise<void> {
    return this.deleteSessionImpl.execute(body);
  }
}
