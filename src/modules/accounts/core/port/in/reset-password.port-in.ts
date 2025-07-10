import { ResetPasswordDTO } from "@/accounts/core/port/in";

export interface ResetPasswordPortIn {
  execute(request: ResetPasswordDTO): Promise<void>;
}
