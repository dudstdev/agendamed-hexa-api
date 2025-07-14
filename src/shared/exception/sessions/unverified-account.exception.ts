import { AccountEntity } from "@/accounts/core/domain";
import { DefaultErrorException, ExceptionTypes } from "@/shared/exception";

export enum UnverifiedAccountFailure {
  UNVERIFIED_ACCOUNT = "Conta não confirmada! Por favor, confirme-a e tente novamente.",
}

export class UnverifiedAccountException extends DefaultErrorException {
  constructor(data: {
    account: Partial<Pick<AccountEntity, "email">>;
    message: UnverifiedAccountFailure;
  }) {
    super({
      type: ExceptionTypes.FORBIDDEN,
      code: "ACCOUNT_NOT_VERIFIED_API_FAILURE",
      data: data.account,
      message: data.message,
    });
  }
}
