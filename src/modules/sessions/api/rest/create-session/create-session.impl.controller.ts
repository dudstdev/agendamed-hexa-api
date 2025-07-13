import { Inject } from "@nestjs/common";

import {
  CreateSessionPortIn,
  SessionRequestDTO,
} from "@/sessions/core/port/in";
import { SessionOutResponseDTO } from "@/sessions/core/port/out";

export class CreateSessionImplController {
  constructor(
    @Inject("CreateSessionPortIn")
    private readonly createSessionService: CreateSessionPortIn,
  ) {}

  async handle(request: SessionRequestDTO): Promise<SessionOutResponseDTO> {
    return this.createSessionService.execute(request);
  }
}
