import { Inject } from "@nestjs/common";

import { GetSessionsPortIn, SessionsRequestDTO } from "@/sessions/core/port/in";
import {
  SessionsListOutResponseDTO,
  SessionsPortOut,
} from "@/sessions/core/port/out";
import { DefaultErrorException, Either, right } from "@/shared/exception";

export class GetSessionsService implements GetSessionsPortIn {
  constructor(
    @Inject("SessionsPortOut")
    private readonly sessionsPortOut: SessionsPortOut,
  ) {}

  async execute({
    accountid,
  }: SessionsRequestDTO): Promise<
    Either<DefaultErrorException, SessionsListOutResponseDTO>
  > {
    const sessions =
      await this.sessionsPortOut.findSessionsByAccountId(accountid);

    const activeSessions = sessions.filter(
      (session) => !session.isRevoked() && !session.isExpired(),
    );

    return right({
      sessions: activeSessions.map((session) => ({
        id: session.id.toString(),
        accountId: session.accountId.toString(),
        clientId: session.clientId,
        refreshToken: session.refreshToken,
        createdAt: session.createdAt,
        expiresAt: session.expiresAt,
        revokedAt: session.revokedAt ?? null,
        ipAddress: session.ipAddress ?? null,
        userAgent: session.userAgent ?? null,
      })),
    });
  }
}
