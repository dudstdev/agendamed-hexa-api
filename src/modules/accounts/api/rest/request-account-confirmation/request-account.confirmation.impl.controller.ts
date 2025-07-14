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
    const response =
      await this.requestAccountConfirmationService.execute(request);

    if (response.isLeft()) {
      throw response.value;
    }
  }
}
