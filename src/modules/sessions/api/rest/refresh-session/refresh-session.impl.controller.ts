import { Inject } from "@nestjs/common";

import {
  RefreshSessionDTO,
  RefreshSessionPortIn,
} from "@/sessions/core/port/in";
import { SessionOutDTO } from "@/sessions/core/port/out";

export class RefreshSessionImplController {
  constructor(
    @Inject("RefreshSessionPortIn")
    private readonly refreshSessionService: RefreshSessionPortIn,
  ) {}

  async execute(request: RefreshSessionDTO): Promise<SessionOutDTO> {
    return this.refreshSessionService.execute(request);
  }
}
