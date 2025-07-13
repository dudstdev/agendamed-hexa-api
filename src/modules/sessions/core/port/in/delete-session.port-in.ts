import { DeleteSessionDTO } from "@/sessions/core/port/in";

export interface DeleteSessionPortIn {
  execute(request: DeleteSessionDTO): Promise<void>;
}
