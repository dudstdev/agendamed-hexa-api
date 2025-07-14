import { AccountEntity } from "@/accounts/core/domain";
import { DefaultErrorException, ExceptionTypes } from "@/shared/exception";

export enum AccountAlreadyConfirmedFailure {
  ACCOUNT_ALREADY_CONFIRMED_FAILURE = "Esta conta já foi confirmada anteriormente.",
}

export class AccountAlreadyConfirmedException extends DefaultErrorException {
  constructor(data: {
    account: Partial<Pick<AccountEntity, "email">>;
    message: AccountAlreadyConfirmedFailure;
  }) {
    super({
      type: ExceptionTypes.CONFLICT,
      code: "ACCOUNT_ALREADY_CONFIRMED_API_FAILURE",
      data: data.account,
      message: data.message,
    });
  }
}
