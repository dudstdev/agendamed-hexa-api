import { Inject } from "@nestjs/common";

import { GetSessionsPortIn, SessionsDTO } from "@/sessions/core/port/in";
import { SessionsOutDTO } from "@/sessions/core/port/out";

export class GetSessionsImplController {
  constructor(
    @Inject("GetSessionsPortIn")
    private readonly getSessionsService: GetSessionsPortIn,
  ) {}

  async execute(request: SessionsDTO): Promise<SessionsOutDTO[]> {
    return this.getSessionsService.execute(request);
  }
}
