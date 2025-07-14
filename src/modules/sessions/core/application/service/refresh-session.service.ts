import { Inject } from "@nestjs/common";

import {
  RefreshSessionPortIn,
  RefreshSessionRequestDTO,
} from "@/sessions/core/port/in";
import {
  EncrypterPortOut,
  SessionOutResponseDTO,
  SessionsPortOut,
} from "@/sessions/core/port/out";
import {
  Either,
  left,
  right,
  SessionAlreadyExpiredException,
  SessionAlreadyExpiredFailure,
  SessionAlreadyRevokedException,
  SessionAlreadyRevokedFailure,
  SessionNotFoundException,
  SessionNotFoundFailure,
} from "@/shared/exception";

export class RefreshSessionService implements RefreshSessionPortIn {
  private readonly ACCESS_TOKEN_EXPIRATION = "15m";
  private readonly REFRESH_TOKEN_EXPIRATION = "30d";

  constructor(
    @Inject("SessionsPortOut")
    private readonly sessionsPortOut: SessionsPortOut,

    @Inject("EncrypterPortOut")
    private readonly encrypterPortOut: EncrypterPortOut,
  ) {}

  async execute({
    refreshToken,
  }: RefreshSessionRequestDTO): Promise<
    Either<
      | SessionNotFoundException
      | SessionAlreadyRevokedException
      | SessionAlreadyExpiredException,
      SessionOutResponseDTO
    >
  > {
    const session = await this.sessionsPortOut.findByRefreshToken(refreshToken);

    if (!session) {
      return left(
        new SessionNotFoundException({
          session: { refreshToken },
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

    if (session.isExpired()) {
      return left(
        new SessionAlreadyExpiredException({
          session: { id: session.id },
          message: SessionAlreadyExpiredFailure.SESSION_ALREADY_EXPIRED,
        }),
      );
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

    return right({
      refreshToken: newRefreshToken,
      accessToken: newAccessToken,
    });
  }
}
