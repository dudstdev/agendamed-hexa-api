import { Body, Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { GetSessionsImplController } from "@/sessions/api/rest";
import { SessionsListOutResponseDTO } from "@/sessions/core/port/out";
import { TokenPayload } from "@/sessions/infrastructure/auth";
import { CurrentUser } from "@/shared/infrastructure/nest/decorators/current-user.decorator";

@ApiTags("Sessions")
@Controller("/sessions")
export class GetSessionsController {
  constructor(private readonly getSessionsImpl: GetSessionsImplController) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Consulta sessões ativas",
    description:
      "Retorna uma lista com todas as sessões ativas vinculadas ao identificador da conta informado.",
  })
  @ApiResponse({
    status: 200,
    description: "Sessões recuperadas com sucesso.",
    type: SessionsListOutResponseDTO,
  })
  @ApiResponse({
    status: 400,
    description: "Formato inválido do identificador da conta.",
  })
  @ApiResponse({
    status: 500,
    description: "Erro inesperado no servidor ao processar a solicitação.",
  })
  async getSessions(
    @CurrentUser() user: TokenPayload,
  ): Promise<SessionsListOutResponseDTO> {
    const accountId = user.sub;

    return this.getSessionsImpl.handle({ accountId: accountId });
  }
}
