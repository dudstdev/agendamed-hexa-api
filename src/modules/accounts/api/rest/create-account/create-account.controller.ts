import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { CreateAccountImplController } from "@/accounts/api/rest/";
import { AccountRequestDTO } from "@/accounts/core/port/in";
import { AccountResponseDTO } from "@/accounts/core/port/out";
import { Public } from "@/shared/infrastructure";

@ApiTags("Accounts")
@Controller("/accounts")
@Public()
export class CreateAccountController {
  constructor(
    private readonly createAccountImpl: CreateAccountImplController,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Cria uma nova conta",
    description: "Cria uma conta no sistema com o e-mail e senha fornecidos.",
  })
  @ApiResponse({
    status: 201,
    description: "Conta criada com sucesso.",
    type: AccountResponseDTO,
  })
  @ApiResponse({
    status: 400,
    description:
      "Requisição malformada ou dados inválidos fornecidos (ex: e-mail ausente ou senha com formato incorreto).",
  })
  @ApiResponse({
    status: 409,
    description: "Já existe uma conta cadastrada com o e-mail informado.",
  })
  @ApiResponse({
    status: 500,
    description: "Erro inesperado no servidor ao processar a solicitação.",
  })
  async createAccount(
    @Body() body: AccountRequestDTO,
  ): Promise<AccountResponseDTO> {
    return this.createAccountImpl.handle(body);
  }
}
