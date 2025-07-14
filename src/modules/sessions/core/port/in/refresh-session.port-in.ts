import { RefreshSessionRequestDTO } from "@/sessions/core/port/in";
import { SessionOutResponseDTO } from "@/sessions/core/port/out";
import { DefaultErrorException, Either } from "@/shared/exception";

export interface RefreshSessionPortIn {
  execute(
    request: RefreshSessionRequestDTO,
  ): Promise<Either<DefaultErrorException, SessionOutResponseDTO>>;
}
