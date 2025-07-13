import { DeleteSessionRequestDTO } from "@/sessions/core/port/in";

export interface DeleteSessionPortIn {
  execute(request: DeleteSessionRequestDTO): Promise<void>;
}
