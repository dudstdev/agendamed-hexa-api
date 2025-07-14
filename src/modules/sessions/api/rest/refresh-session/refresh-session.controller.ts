import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { RefreshSessionImplController } from "@/sessions/api/rest";
import { RefreshSessionRequestDTO } from "@/sessions/core/port/in";
import { SessionOutResponseDTO } from "@/sessions/core/port/out";
import { Public } from "@/shared/infrastructure";

@ApiTags("Sessions")
@Controller("/sessions/refresh")
@Public()
export class RefreshSessionController {
  constructor(
    private readonly refreshSessionImpl: RefreshSessionImplController,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Atualiza os tokens da sessão",
    description:
      "Gera novos tokens de acesso e atualização com base em um token de atualização válido.",
  })
  @ApiResponse({
    status: 200,
    description: "Tokens gerados com sucesso.",
    type: SessionOutResponseDTO,
  })
  @ApiResponse({
    status: 400,
    description:
      "O token de atualização está ausente ou não segue o formato esperado.",
  })
  @ApiResponse({
    status: 401,
    description:
      "O token de atualização informado está expirado, foi revogado ou não é válido.",
  })
  @ApiResponse({
    status: 500,
    description: "Erro inesperado no servidor ao processar a solicitação.",
  })
  async refreshSession(
    @Body() body: RefreshSessionRequestDTO,
  ): Promise<SessionOutResponseDTO> {
    return this.refreshSessionImpl.handle(body);
  }
}
