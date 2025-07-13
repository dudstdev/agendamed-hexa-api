import { ResetPasswordRequestDTO } from "@/accounts/core/port/in";

export interface ResetPasswordPortIn {
  execute(request: ResetPasswordRequestDTO): Promise<void>;
}
