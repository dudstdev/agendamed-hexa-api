import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { RequestPasswordResetImplController } from "@/accounts/api/rest";
import { PasswordResetRequestDTO } from "@/accounts/core/port/in";
import { Public } from "@/shared/infrastructure";

@ApiTags("Accounts")
@Controller("/accounts/password-reset")
@Public()
export class RequestPasswordResetController {
  constructor(
    private readonly requestPasswordResetImpl: RequestPasswordResetImplController,
  ) {}

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({
    summary: "Solicita redefinição de senha",
    description:
      "Gera e envia um código de redefinição de senha para o e-mail associado à conta.",
  })
  @ApiResponse({
    status: 202,
    description:
      "Solicitação de redefinição de senha aceita. Um código será enviado por e-mail.",
  })
  @ApiResponse({
    status: 400,
    description:
      "O e-mail informado está ausente ou possui um formato inválido.",
  })
  @ApiResponse({
    status: 404,
    description: "Nenhuma conta encontrada com o e-mail informado.",
  })
  @ApiResponse({
    status: 500,
    description: "Erro inesperado no servidor ao processar a solicitação.",
  })
  async requestPasswordReeset(
    @Body() body: PasswordResetRequestDTO,
  ): Promise<void> {
    return this.requestPasswordResetImpl.handle(body);
  }
}
