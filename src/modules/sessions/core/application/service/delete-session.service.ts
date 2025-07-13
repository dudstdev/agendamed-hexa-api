import { Inject } from "@nestjs/common";

import { DeleteSessionDTO, DeleteSessionPortIn } from "@/sessions/core/port/in";
import { SessionsPortOut } from "@/sessions/core/port/out";

export class DeleteSessionService implements DeleteSessionPortIn {
  constructor(
    @Inject("SessionsPortOut")
    private readonly sessionsPortOut: SessionsPortOut,
  ) {}

  async execute({ sessionId }: DeleteSessionDTO): Promise<void> {
    const session = await this.sessionsPortOut.findById(sessionId);

    if (!session) {
      throw new Error("Business Exception");
    }

    if (session.revokedAt) {
      throw new Error("Business Exception");
    }

    await this.sessionsPortOut.revoke(sessionId);
  }
}
