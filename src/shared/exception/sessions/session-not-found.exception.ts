import { SessionEntity } from "@/sessions/core/domain";
import { DefaultErrorException, ExceptionTypes } from "@/shared/exception";

export enum SessionNotFoundFailure {
  SESSION_NOT_FOUND = "Sessão não encontrada ou já expirada.",
}

export class SessionNotFoundException extends DefaultErrorException {
  constructor(data: {
    session: Partial<Pick<SessionEntity, "id" | "refreshToken">>;
    message: SessionNotFoundFailure;
  }) {
    super({
      type: ExceptionTypes.NOT_FOUND,
      code: "SESSION_NOT_FOUND_API_FAILURE",
      data: data.session,
      message: data.message,
    });
  }
}
