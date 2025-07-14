import { SessionEntity } from "@/sessions/core/domain";
import { DefaultErrorException, ExceptionTypes } from "@/shared/exception";

export enum SessionAlreadyRevokedFailure {
  SESSION_ALREADY_REVOKED = "Sessão já revogada anteriormente.",
}

export class SessionAlreadyRevokedException extends DefaultErrorException {
  constructor(data: {
    session: Partial<Pick<SessionEntity, "id">>;
    message: SessionAlreadyRevokedFailure;
  }) {
    super({
      type: ExceptionTypes.CONFLICT,
      code: "SESSION_ALREADY_REVOKED_API_FAILURE",
      data: data.session,
      message: data.message,
    });
  }
}
