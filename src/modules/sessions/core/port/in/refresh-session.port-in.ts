import { RefreshSessionRequestDTO } from "@/sessions/core/port/in";
import { SessionOutResponseDTO } from "@/sessions/core/port/out";

export interface RefreshSessionPortIn {
  execute(request: RefreshSessionRequestDTO): Promise<SessionOutResponseDTO>;
}
