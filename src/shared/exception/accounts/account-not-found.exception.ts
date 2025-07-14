import { AccountEntity } from "@/accounts/core/domain";
import { DefaultErrorException, ExceptionTypes } from "@/shared/exception";

export enum AccountNotFoundFailure {
  ACCOUNT_NOT_FOUND_FAILURE = "Nenhuma conta foi encontrada com o email informado.",
}

export class AccountNotFoundException extends DefaultErrorException {
  constructor(data: {
    account: Partial<Pick<AccountEntity, "email">>;
    message: AccountNotFoundFailure;
  }) {
    super({
      type: ExceptionTypes.NOT_FOUND,
      code: "ACCOUNT_NOT_FOUND_API_FAILURE",
      data: data.account,
      message: data.message,
    });
  }
}
