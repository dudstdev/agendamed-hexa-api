import { PasswordResetDTO } from "@/accounts/core/port/in";

export interface RequestPasswordResetPortIn {
  execute(request: PasswordResetDTO): Promise<void>;
}
