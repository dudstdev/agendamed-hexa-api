import { AccountConfirmationRequestDTO } from "@/accounts/core/port/in";
import { DefaultErrorException, Either } from "@/shared/exception";

export interface RequestAccountConfirmationPortIn {
  execute(
    request: AccountConfirmationRequestDTO,
  ): Promise<Either<DefaultErrorException, void>>;
}
