import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class RefreshSessionRequestDTO {
  @ApiProperty({
    description:
      "Refresh token used to generate new access and refresh tokens.",
    example: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  })
  @IsString()
  refreshToken: string;
}
