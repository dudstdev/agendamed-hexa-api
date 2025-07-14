import { Inject } from "@nestjs/common";

import {
  DeleteSessionPortIn,
  DeleteSessionRequestDTO,
} from "@/sessions/core/port/in";
import { SessionsPortOut } from "@/sessions/core/port/out";
import { UniqueEntityID } from "@/shared/domain";
import {
  Either,
  left,
  right,
  SessionAlreadyRevokedException,
  SessionAlreadyRevokedFailure,
  SessionNotFoundException,
  SessionNotFoundFailure,
} from "@/shared/exception";

export class DeleteSessionService implements DeleteSessionPortIn {
  constructor(
    @Inject("SessionsPortOut")
    private readonly sessionsPortOut: SessionsPortOut,
  ) {}

  async execute({
    sessionId,
  }: DeleteSessionRequestDTO): Promise<
    Either<SessionNotFoundException | SessionAlreadyRevokedException, void>
  > {
    const session = await this.sessionsPortOut.findById(sessionId);

    if (!session) {
      return left(
        new SessionNotFoundException({
          session: { id: new UniqueEntityID(sessionId) },
          message: SessionNotFoundFailure.SESSION_NOT_FOUND,
        }),
      );
    }

    if (session.isRevoked()) {
      return left(
        new SessionAlreadyRevokedException({
          session: { id: session.id },
          message: SessionAlreadyRevokedFailure.SESSION_ALREADY_REVOKED,
        }),
      );
    }

    await this.sessionsPortOut.revoke(sessionId);

    return right(undefined);
  }
}
