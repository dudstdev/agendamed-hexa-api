import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

import { IsPassword } from "@/shared/infrastructure";

export class ResetPasswordDTO {
  @ApiProperty({
    description: "8-digit code sent to the user's email to reset password.",
    example: "12345678",
  })
  @IsString()
  @Length(8, 8, {
    message: "Confirmation code must be exactly 8 characters.",
  })
  code: string;

  @ApiProperty({
    description: "New password. Must be between 8 and 64 characters long.",
    example: "NewStrongPass123@",
  })
  @IsPassword()
  newPassword: string;
}
