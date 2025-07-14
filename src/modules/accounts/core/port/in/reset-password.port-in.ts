import { ResetPasswordRequestDTO } from "@/accounts/core/port/in";
import { DefaultErrorException, Either } from "@/shared/exception";

export interface ResetPasswordPortIn {
  execute(
    request: ResetPasswordRequestDTO,
  ): Promise<Either<DefaultErrorException, void>>;
}
