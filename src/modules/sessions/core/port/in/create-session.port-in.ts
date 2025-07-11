import { SessionDTO } from "@/sessions/core/port/in";
import { SessionOutDTO } from "@/sessions/core/port/out";

export interface CreateSessionPortIn {
  execute(request: SessionDTO): Promise<SessionOutDTO>;
}
