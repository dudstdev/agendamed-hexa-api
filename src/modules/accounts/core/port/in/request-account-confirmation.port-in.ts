import { AccountConfirmationRequestDTO } from "@/accounts/core/port/in";

export interface RequestAccountConfirmationPortIn {
  execute(request: AccountConfirmationRequestDTO): Promise<void>;
}
