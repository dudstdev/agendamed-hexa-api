import { Inject, Injectable } from "@nestjs/common";

import {
  AccountConfirmationDTO,
  RequestAccountConfirmationPortIn,
} from "@/accounts/core/port/in";

@Injectable()
export class RequestAccountConfirmationImplController {
  constructor(
    @Inject("RequestAccountConfirmationPortIn")
    private readonly requestAccountConfirmationService: RequestAccountConfirmationPortIn,
  ) {}

  async execute(request: AccountConfirmationDTO): Promise<void> {
    return this.requestAccountConfirmationService.execute(request);
  }
}
