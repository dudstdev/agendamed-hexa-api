import { TokenEntity } from "@/accounts/core/domain";
import { DefaultErrorException, ExceptionTypes } from "@/shared/exception";

export enum InvalidOrExpiredTokenFailure {
  INVALID_OR_EXPIRED_TOKEN_FAILURE = "O token informado é inválido ou expirou.",
}

export class InvalidOrExpiredTokenException extends DefaultErrorException {
  constructor(data: {
    token: Partial<Pick<TokenEntity, "code">>;
    message: InvalidOrExpiredTokenFailure;
  }) {
    super({
      type: ExceptionTypes.UNAUTHORIZED,
      code: "INVALID_OR_EXPIRED_TOKEN_API_FAILURE",
      data: data.token,
      message: data.message,
    });
  }
}
