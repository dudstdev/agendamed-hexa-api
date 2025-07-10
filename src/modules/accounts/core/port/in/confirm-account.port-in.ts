import { ConfirmAccountDTO } from "@/accounts/core/port/in";
import { AccountResponseDTO } from "@/accounts/core/port/out";

export interface ConfirmAccountPortIn {
  execute(request: ConfirmAccountDTO): Promise<AccountResponseDTO>;
}
