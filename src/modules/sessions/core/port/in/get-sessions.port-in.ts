import { SessionsDTO } from "@/sessions/core/port/in";
import { SessionsOutDTO } from "@/sessions/core/port/out";

export interface GetSessionsPortIn {
  execute(request: SessionsDTO): Promise<SessionsOutDTO[]>;
}
