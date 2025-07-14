import { Body, Controller, Delete, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

import { DeleteSessionImplController } from "@/sessions/api/rest";
import { DeleteSessionRequestDTO } from "@/sessions/core/port/in";

@ApiTags("Sessions")
@Controller("/sessions")
export class DeleteSessionController {
  constructor(
    private readonly deleteSessionImpl: DeleteSessionImplController,
  ) {}

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: "Revogar sessão (logout)",
    description:
      "Revoga uma sessão com base no ID da sessão. Normalmente usada para logout do dispositivo atual.",
  })
  @ApiParam({
    name: "sessionId",
    required: true,
    description: "Identificador da sessão a ser revogada.",
  })
  @ApiResponse({
    status: 204,
    description: "Sessão revogada com sucesso.",
  })
  @ApiResponse({
    status: 404,
    description: "Nenhuma sessão foi encontrada com o ID informado.",
  })
  @ApiResponse({
    status: 500,
    description: "Erro inesperado no servidor ao processar a solicitação.",
  })
  async deleteSession(@Body() body: DeleteSessionRequestDTO): Promise<void> {
    return this.deleteSessionImpl.handle(body);
  }
}
