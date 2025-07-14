import { DefaultErrorException, ExceptionTypes } from "@/shared/exception";

export enum WrongCredentialsFailure {
  WRONG_CREDENTIALS = "Credenciais incorretas! Por favor, verifique e tente novamente.",
}

export class WrongCredentialsException extends DefaultErrorException {
  constructor(
    message: WrongCredentialsFailure = WrongCredentialsFailure.WRONG_CREDENTIALS,
  ) {
    super({
      type: ExceptionTypes.UNAUTHORIZED,
      code: "WRONG_CREDENTIALS_API_FAILURE",
      message,
    });
  }
}
