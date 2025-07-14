import { Body, Controller, HttpCode, HttpStatus, Patch } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { ResetPasswordImplController } from "@/accounts/api/rest";
import { ResetPasswordRequestDTO } from "@/accounts/core/port/in";
import { Public } from "@/shared/infrastructure";

@ApiTags("Accounts")
@Controller("/accounts/password-reset/reset")
@Public()
export class ResetPasswordController {
  constructor(
    private readonly resetPasswordImpl: ResetPasswordImplController,
  ) {}

  @Patch()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: "Redefinir senha",
    description:
      "Permite redefinir a senha da conta usando o código de verificação recebido por e-mail.",
  })
  @ApiResponse({
    status: 204,
    description: "Senha redefinida com sucesso.",
  })
  @ApiResponse({
    status: 400,
    description:
      "Formato da senha inválido ou campos obrigatórios não foram preenchidos corretamente.",
  })
  @ApiResponse({
    status: 401,
    description: "Código de redefinição inválido, expirado ou já utilizado.",
  })
  @ApiResponse({
    status: 404,
    description: "Conta associada ao código de redefinição não foi encontrada.",
  })
  @ApiResponse({
    status: 500,
    description: "Erro inesperado no servidor ao processar a solicitação.",
  })
  async resetPassword(@Body() body: ResetPasswordRequestDTO): Promise<void> {
    return this.resetPasswordImpl.handle(body);
  }
}
