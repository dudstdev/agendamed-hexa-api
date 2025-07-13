import { Inject } from "@nestjs/common";

import { CreateSessionPortIn, SessionDTO } from "@/sessions/core/port/in";
import { SessionOutDTO } from "@/sessions/core/port/out";

export class CreateSessionImplController {
  constructor(
    @Inject("CreateSessionPortIn")
    private readonly createSessionService: CreateSessionPortIn,
  ) {}

  async execute(request: SessionDTO): Promise<SessionOutDTO> {
    return this.createSessionService.execute(request);
  }
}
