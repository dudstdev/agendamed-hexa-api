import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { RequestAccountConfirmationImplController } from "@/accounts/api/rest";
import { AccountConfirmationRequestDTO } from "@/accounts/core/port/in";
import { Public } from "@/shared/infrastructure";

@ApiTags("Accounts")
@Controller("/accounts/confirmation")
@Public()
export class RequestAccountConfirmationController {
  constructor(
    private readonly requestAccountConfirmationImpl: RequestAccountConfirmationImplController,
  ) {}

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({
    summary: "Solicita confirmação de conta",
    description:
      "Gera e envia um código de confirmação por e-mail para validar uma conta existente.",
  })
  @ApiResponse({
    status: 202,
    description:
      "Código de confirmação enviado com sucesso para o e-mail informado.",
  })
  @ApiResponse({
    status: 400,
    description:
      "Requisição malformada ou dados inválidos fornecidos (ex: e-mail ausente).",
  })
  @ApiResponse({
    status: 404,
    description: "Nenhuma conta encontrada com o e-mail informado.",
  })
  @ApiResponse({
    status: 409,
    description:
      "A conta já foi confirmada anteriormente e não requer nova confirmação.",
  })
  @ApiResponse({
    status: 500,
    description: "Erro inesperado no servidor ao processar a solicitação.",
  })
  async requestAccountConfirmation(
    @Body() body: AccountConfirmationRequestDTO,
  ): Promise<void> {
    return this.requestAccountConfirmationImpl.handle(body);
  }
}
