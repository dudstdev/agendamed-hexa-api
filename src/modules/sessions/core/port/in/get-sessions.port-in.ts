import { SessionsRequestDTO } from "@/sessions/core/port/in";
import { SessionsOutResponseDTO } from "@/sessions/core/port/out";

export interface GetSessionsPortIn {
  execute(request: SessionsRequestDTO): Promise<SessionsOutResponseDTO[]>;
}
