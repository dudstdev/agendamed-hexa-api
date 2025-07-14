import { SessionEntity } from "@/sessions/core/domain";
import { DefaultErrorException, ExceptionTypes } from "@/shared/exception";

export enum SessionAlreadyExpiredFailure {
  SESSION_ALREADY_EXPIRED = "A sessão expirou e não pode mais ser renovada.",
}

export class SessionAlreadyExpiredException extends DefaultErrorException {
  constructor(data: {
    session: Partial<Pick<SessionEntity, "id">>;
    message: SessionAlreadyExpiredFailure;
  }) {
    super({
      type: ExceptionTypes.UNAUTHORIZED,
      code: "SESSION_ALREADY_EXPIRED_API_FAILURE",
      data: data.session,
      message: data.message,
    });
  }
}
