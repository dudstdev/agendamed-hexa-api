import { SessionEntity } from "@/sessions/core/domain";

export interface SessionsPortOut {
  findByAccountIdAndClientId(
    accountId: string,
    clientId: string,
  ): Promise<SessionEntity | null>;
  create(session: SessionEntity): Promise<void>;
  revoke(sessionId: string): Promise<void>;
}
