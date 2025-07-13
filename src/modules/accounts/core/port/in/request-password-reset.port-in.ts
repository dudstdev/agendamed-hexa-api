import { PasswordResetRequestDTO } from "@/accounts/core/port/in";

export interface RequestPasswordResetPortIn {
  execute(request: PasswordResetRequestDTO): Promise<void>;
}
