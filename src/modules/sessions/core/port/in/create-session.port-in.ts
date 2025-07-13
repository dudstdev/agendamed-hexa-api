import { SessionRequestDTO } from "@/sessions/core/port/in";
import { SessionOutResponseDTO } from "@/sessions/core/port/out";

export interface CreateSessionPortIn {
  execute(request: SessionRequestDTO): Promise<SessionOutResponseDTO>;
}
