import { SessionRequestDTO } from "@/sessions/core/port/in";
import { SessionOutResponseDTO } from "@/sessions/core/port/out";
import { DefaultErrorException, Either } from "@/shared/exception";

export interface CreateSessionPortIn {
  execute(
    request: SessionRequestDTO,
  ): Promise<Either<DefaultErrorException, SessionOutResponseDTO>>;
}
