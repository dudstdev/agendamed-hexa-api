import { Inject } from "@nestjs/common";

import { GetSessionsPortIn, SessionsRequestDTO } from "@/sessions/core/port/in";
import {
  SessionsOutResponseDTO,
  SessionsPortOut,
} from "@/sessions/core/port/out";

export class GetSessionsService implements GetSessionsPortIn {
  constructor(
    @Inject("SessionsPortOut")
    private readonly sessionsPortOut: SessionsPortOut,
  ) {}

  async execute({
    accountid,
  }: SessionsRequestDTO): Promise<SessionsOutResponseDTO[]> {
    const sessions =
      await this.sessionsPortOut.findSessionsByAccountId(accountid);

    const activeSessions = sessions.filter(
      (session) => !session.isRevoked() && !session.isExpired(),
    );

    return activeSessions.map((session) => ({
      id: session.id.toString(),
      accountId: session.accountId.toString(),
      clientId: session.clientId,
      refreshToken: session.refreshToken,
      createdAt: session.createdAt,
      expiresAt: session.expiresAt,
      revokedAt: session.revokedAt ?? null,
      ipAddress: session.ipAddress ?? null,
      userAgent: session.userAgent ?? null,
    }));
  }
}
