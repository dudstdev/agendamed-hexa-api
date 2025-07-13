import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class SessionOutResponseDTO {
  @ApiProperty({
    description:
      "JWT token utilizado para autenticação nas próximas requisições (válido por 15 minutos).",
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  })
  @IsString()
  accessToken: string;

  @ApiProperty({
    description:
      "Refresh token utilizado para renovar a sessão após o access token expirar (válido por 30 dias).",
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  })
  @IsString()
  refreshToken: string;
}
