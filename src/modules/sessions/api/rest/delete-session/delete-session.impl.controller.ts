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
    return this.deleteSessionService.execute(request);
  }
}
