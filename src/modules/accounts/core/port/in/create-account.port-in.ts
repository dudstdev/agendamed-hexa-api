import { AccountRequestDTO } from "@/accounts/core/port/in";
import { AccountResponseDTO } from "@/accounts/core/port/out";
import { DefaultErrorException, Either } from "@/shared/exception";

export interface CreateAccountPortIn {
  execute(
    request: AccountRequestDTO,
  ): Promise<Either<DefaultErrorException, AccountResponseDTO>>;
}
