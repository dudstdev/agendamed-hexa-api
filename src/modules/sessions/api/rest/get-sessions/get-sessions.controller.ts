import { Body, Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { GetSessionsImplController } from "@/sessions/api/rest";
import { SessionsRequestDTO } from "@/sessions/core/port/in";
import { SessionsListOutResponseDTO } from "@/sessions/core/port/out";
import { Public } from "@/shared/infrastructure";

@ApiTags("Sessions")
@Controller("/sessions")
@Public()
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
    @Body() body: SessionsRequestDTO,
  ): Promise<SessionsListOutResponseDTO> {
    return this.getSessionsImpl.handle(body);
  }
}
