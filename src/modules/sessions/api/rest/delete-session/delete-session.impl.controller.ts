import { Inject } from "@nestjs/common";

import {
  DeleteSessionPortIn,
  DeleteSessionRequestDTO,
} from "@/sessions/core/port/in";

export class DeleteSessionImplController {
  constructor(
    @Inject("DeleteSessionPortIn")
    private readonly deleteSessionService: DeleteSessionPortIn,
  ) {}

  async handle(request: DeleteSessionRequestDTO): Promise<void> {
    const response = await this.deleteSessionService.execute(request);

    if (response.isLeft()) {
      throw response.value;
    }

    return response.value;
  }
}
