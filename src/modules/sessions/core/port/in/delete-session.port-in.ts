import { DeleteSessionRequestDTO } from "@/sessions/core/port/in";
import { DefaultErrorException, Either } from "@/shared/exception";

export interface DeleteSessionPortIn {
  execute(
    request: DeleteSessionRequestDTO,
  ): Promise<Either<DefaultErrorException, void>>;
}
