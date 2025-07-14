import { SessionsRequestDTO } from "@/sessions/core/port/in";
import { SessionsListOutResponseDTO } from "@/sessions/core/port/out";
import { DefaultErrorException, Either } from "@/shared/exception";

export interface GetSessionsPortIn {
  execute(
    request: SessionsRequestDTO,
  ): Promise<Either<DefaultErrorException, SessionsListOutResponseDTO>>;
}
