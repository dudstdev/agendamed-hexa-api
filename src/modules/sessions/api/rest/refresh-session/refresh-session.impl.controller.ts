import { Inject } from "@nestjs/common";

import {
  RefreshSessionPortIn,
  RefreshSessionRequestDTO,
} from "@/sessions/core/port/in";
import { SessionOutResponseDTO } from "@/sessions/core/port/out";

export class RefreshSessionImplController {
  constructor(
    @Inject("RefreshSessionPortIn")
    private readonly refreshSessionService: RefreshSessionPortIn,
  ) {}

  async handle(
    request: RefreshSessionRequestDTO,
  ): Promise<SessionOutResponseDTO> {
    const response = await this.refreshSessionService.execute(request);

    if (response.isLeft()) {
      throw response.value;
    }

    return response.value;
  }
}
