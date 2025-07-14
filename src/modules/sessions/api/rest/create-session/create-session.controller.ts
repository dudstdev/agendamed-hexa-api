import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { CreateSessionImplController } from "@/sessions/api/rest";
import { SessionRequestDTO } from "@/sessions/core/port/in";
import { SessionOutResponseDTO } from "@/sessions/core/port/out";
import { Public } from "@/shared/infrastructure";

@ApiTags("Sessions")
@Controller("/sessions")
@Public()
export class CreateSessionController {
  constructor(
    private readonly createSessionImpl: CreateSessionImplController,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Autenticação de usuário (login)",
    description:
      "Autentica um usuário com e-mail e senha. Retorna os tokens de acesso e atualização (refresh token).",
  })
  @ApiResponse({
    status: 201,
    description:
      "Sessão criada com sucesso. Os tokens de autenticação foram gerados.",
    type: SessionOutResponseDTO,
  })
  @ApiResponse({
    status: 401,
    description:
      "Credenciais inválidas. Verifique o e-mail e a senha informados.",
  })
  @ApiResponse({
    status: 403,
    description: "A conta informada ainda não foi verificada por e-mail.",
  })
  @ApiResponse({
    status: 500,
    description:
      "Erro inesperado no servidor ao processar a solicitação de login.",
  })
  async createSession(
    @Body() body: SessionRequestDTO,
  ): Promise<SessionOutResponseDTO> {
    return this.createSessionImpl.handle(body);
  }
}
