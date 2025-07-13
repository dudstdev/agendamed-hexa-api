import { Inject, Injectable } from "@nestjs/common";

import {
  AccountConfirmationRequestDTO,
  RequestAccountConfirmationPortIn,
} from "@/accounts/core/port/in";

@Injectable()
export class RequestAccountConfirmationImplController {
  constructor(
    @Inject("RequestAccountConfirmationPortIn")
    private readonly requestAccountConfirmationService: RequestAccountConfirmationPortIn,
  ) {}

  async handle(request: AccountConfirmationRequestDTO): Promise<void> {
    return this.requestAccountConfirmationService.execute(request);
  }
}
