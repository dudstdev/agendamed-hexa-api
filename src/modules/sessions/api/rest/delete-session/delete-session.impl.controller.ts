import { Inject } from "@nestjs/common";

import { DeleteSessionDTO, DeleteSessionPortIn } from "@/sessions/core/port/in";

export class DeleteSessionImplController {
  constructor(
    @Inject("DeleteSessionPortIn")
    private readonly deleteSessionService: DeleteSessionPortIn,
  ) {}

  async handle(request: DeleteSessionDTO): Promise<void> {
    return this.deleteSessionService.execute(request);
  }
}
