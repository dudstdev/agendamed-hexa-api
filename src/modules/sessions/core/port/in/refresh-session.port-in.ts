import { RefreshSessionDTO } from "@/sessions/core/port/in";
import { SessionOutDTO } from "@/sessions/core/port/out";

export interface RefreshSessionPortIn {
  execute(request: RefreshSessionDTO): Promise<SessionOutDTO>;
}
