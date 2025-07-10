import { AccountRequestDTO } from "@/accounts/core/port/in";
import { AccountResponseDTO } from "@/accounts/core/port/out";

export interface CreateAccountPortIn {
  execute(request: AccountRequestDTO): Promise<AccountResponseDTO>;
}
