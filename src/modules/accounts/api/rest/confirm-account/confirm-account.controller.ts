import { Body, Controller, HttpCode, HttpStatus, Patch } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { ConfirmAccountImplController } from "@/accounts/api/rest";
import { ConfirmAccountRequestDTO } from "@/accounts/core/port/in";
import { AccountResponseDTO } from "@/accounts/core/port/out";
import { Public } from "@/shared/infrastructure";

@ApiTags("Accounts")
@Controller("/accounts/confirmation")
@Public()
export class ConfirmAccountController {
  constructor(
    private readonly confirmAccountImpl: ConfirmAccountImplController,
  ) {}

  @Patch()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Confirmação de conta",
    description:
      "Confirma a conta do usuário com base no código de confirmação recebido por e-mail.",
  })
  @ApiResponse({
    status: 200,
    description: "Conta confirmada com sucesso.",
    type: AccountResponseDTO,
  })
  @ApiResponse({
    status: 400,
    description:
      "Requisição inválida. Código de confirmação ausente ou malformado.",
  })
  @ApiResponse({
    status: 401,
    description: "Código de confirmação inválido, expirado ou não autorizado.",
  })
  @ApiResponse({
    status: 404,
    description: "Conta associada ao código de confirmação não foi encontrada.",
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
  async confirmAccount(
    @Body() body: ConfirmAccountRequestDTO,
  ): Promise<AccountResponseDTO> {
    return this.confirmAccountImpl.handle(body);
  }
}
