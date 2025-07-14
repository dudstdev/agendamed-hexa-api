import { TokenEntity } from "@/accounts/core/domain";
import { DefaultErrorException, ExceptionTypes } from "@/shared/exception";

export enum TokenNotFoundFailure {
  TOKEN_NOT_FOUND_FAILURE = "Nenhum token foi encontrada com o código informado.",
}

export class TokenNotFoundException extends DefaultErrorException {
  constructor(data: {
    token: Partial<Pick<TokenEntity, "code">>;
    message: TokenNotFoundFailure;
  }) {
    super({
      type: ExceptionTypes.NOT_FOUND,
      code: "TOKEN_NOT_FOUND_API_FAILURE",
      data: data.token,
      message: data.message,
    });
  }
}
