import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class DeleteSessionRequestDTO {
  @ApiProperty({
    description: "Unique identifier of the session to be deleted/revoked.",
    example: "550e8400-e29b-41d4-a716-446655440000",
  })
  @IsString()
  sessionId: string;
}
