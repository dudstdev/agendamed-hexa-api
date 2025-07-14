import { PasswordResetRequestDTO } from "@/accounts/core/port/in";
import { DefaultErrorException, Either } from "@/shared/exception";

export interface RequestPasswordResetPortIn {
  execute(
    request: PasswordResetRequestDTO,
  ): Promise<Either<DefaultErrorException, void>>;
}
