import { Inject } from "@nestjs/common";

import {
  RefreshSessionDTO,
  RefreshSessionPortIn,
} from "@/sessions/core/port/in";
import {
  EncrypterPortOut,
  SessionOutDTO,
  SessionsPortOut,
} from "@/sessions/core/port/out";

export class RefreshSessionService implements RefreshSessionPortIn {
  private readonly ACCESS_TOKEN_EXPIRATION = "15m";
  private readonly REFRESH_TOKEN_EXPIRATION = "30d";

  constructor(
    @Inject("SessionsPortOut")
    private readonly sessionsPortOut: SessionsPortOut,

    @Inject("EncrypterPortOut")
    private readonly encrypterPortOut: EncrypterPortOut,
  ) {}

  async execute({ refreshToken }: RefreshSessionDTO): Promise<SessionOutDTO> {
    const session = await this.sessionsPortOut.findByRefreshToken(refreshToken);

    if (!session) {
      throw new Error();
    }

    if (session.revokedAt) {
      throw new Error();
    }

    if (session.isExpired()) {
      throw new Error();
    }

    const newRefreshToken = await this.encrypterPortOut.encrypt(
      { sub: session.accountId.toString(), type: "refresh-token" },
      { expiresIn: this.REFRESH_TOKEN_EXPIRATION },
    );

    const newAccessToken = await this.encrypterPortOut.encrypt(
      { sub: session.accountId.toString() },
      { expiresIn: this.ACCESS_TOKEN_EXPIRATION },
    );

    session.refreshToken = newRefreshToken;

    await this.sessionsPortOut.save(session);

    return {
      refreshToken: newRefreshToken,
      accessToken: newAccessToken,
    };
  }
}
