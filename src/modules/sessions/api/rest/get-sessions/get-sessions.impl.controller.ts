import { Inject } from "@nestjs/common";

import { GetSessionsPortIn, SessionsRequestDTO } from "@/sessions/core/port/in";
import { SessionsListOutResponseDTO } from "@/sessions/core/port/out";

export class GetSessionsImplController {
  constructor(
    @Inject("GetSessionsPortIn")
    private readonly getSessionsService: GetSessionsPortIn,
  ) {}

  async handle(
    request: SessionsRequestDTO,
  ): Promise<SessionsListOutResponseDTO> {
    const response = await this.getSessionsService.execute(request);

    if (response.isLeft()) {
      throw response.value;
    }

    return response.value;
  }
}
