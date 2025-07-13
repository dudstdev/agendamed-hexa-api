import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { CreateSessionImplController } from "@/sessions/api/rest";
import { SessionDTO } from "@/sessions/core/port/in";
import { SessionOutDTO } from "@/sessions/core/port/out";
import { Public } from "@/shared/infrastructure";

@ApiTags("Sessions")
@Controller("/sessions")
@Public()
export class CreateSessionController {
  constructor(
    private readonly createSessionImpl: CreateSessionImplController,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Create session (login)",
    description:
      "Creates a new session using user credentials. Returns access and refresh tokens.",
  })
  @ApiResponse({
    status: 201,
    description:
      "Session successfully created. Returns access and refresh tokens.",
    type: SessionOutDTO,
  })
  @ApiResponse({
    status: 401,
    description: "Invalid credentials",
  })
  @ApiResponse({
    status: 403,
    description: "Email not verified. Account is restricted.",
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error.",
  })
  async createSession(@Body() body: SessionDTO): Promise<SessionOutDTO> {
    return this.createSessionImpl.execute(body);
  }
}
