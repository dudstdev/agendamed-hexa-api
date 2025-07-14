import { SessionEntity } from "@/sessions/core/domain";

export interface SessionsPortOut {
  findById(sessionId: string): Promise<SessionEntity | null>;
  findSessionsByAccountId(accountId: string): Promise<SessionEntity[]>;
  findByAccountIdAndClientId(
    accountId: string,
    clientId: string,
  ): Promise<SessionEntity | null>;
  findByRefreshToken(refreshToken: string): Promise<SessionEntity | null>;
  save(session: SessionEntity): Promise<void>;
  create(session: SessionEntity): Promise<void>;
  revoke(sessionId: string): Promise<void>;
}
