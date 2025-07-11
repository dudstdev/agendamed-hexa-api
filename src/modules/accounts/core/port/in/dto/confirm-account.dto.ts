import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class ConfirmAccountDTO {
  @ApiProperty({
    description:
      "8-digit code sent to the user's email for account confirmation.",
    example: "12345678",
  })
  @IsString()
  @Length(8, 8, {
    message: "Confirmation code must be exactly 8 characters.",
  })
  code: string;
}
