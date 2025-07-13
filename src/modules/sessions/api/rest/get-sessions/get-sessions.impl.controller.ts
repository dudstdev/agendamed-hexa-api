import { Inject } from "@nestjs/common";

import { GetSessionsPortIn, SessionsRequestDTO } from "@/sessions/core/port/in";
import { SessionsOutResponseDTO } from "@/sessions/core/port/out";

export class GetSessionsImplController {
  constructor(
    @Inject("GetSessionsPortIn")
    private readonly getSessionsService: GetSessionsPortIn,
  ) {}

  async handle(request: SessionsRequestDTO): Promise<SessionsOutResponseDTO[]> {
    return this.getSessionsService.execute(request);
  }
}
