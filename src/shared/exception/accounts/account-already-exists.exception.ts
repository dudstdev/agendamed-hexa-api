import { AccountEntity } from "@/accounts/core/domain";
import { DefaultErrorException, ExceptionTypes } from "@/shared/exception";

export enum AccountAlreadyExistsFailure {
  ACCOUNT_ALREADY_EXISTS_FAILURE = "Já existe uma conta com o e-mail informado.",
}

export class AccountAlreadyExistsException extends DefaultErrorException {
  constructor(data: {
    account: Partial<Pick<AccountEntity, "email">>;
    message: AccountAlreadyExistsFailure;
  }) {
    super({
      type: ExceptionTypes.CONFLICT,
      code: "ACCOUNT_ALREADY_EXISTS_API_FAILURE",
      data: data.account,
      message: data.message,
    });
  }
}
