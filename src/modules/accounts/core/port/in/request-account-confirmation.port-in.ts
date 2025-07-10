import { AccountConfirmationDTO } from "@/accounts/core/port/in";

export interface RequestAccountConfirmationPortIn {
  execute(request: AccountConfirmationDTO): Promise<void>;
}
