import { ConfirmAccountRequestDTO } from "@/accounts/core/port/in";
import { AccountResponseDTO } from "@/accounts/core/port/out";
import { DefaultErrorException, Either } from "@/shared/exception";

export interface ConfirmAccountPortIn {
  execute(
    request: ConfirmAccountRequestDTO,
  ): Promise<Either<DefaultErrorException, AccountResponseDTO>>;
}
