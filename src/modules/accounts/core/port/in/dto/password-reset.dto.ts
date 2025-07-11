import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class PasswordResetDTO {
  @ApiProperty({
    description: "Email address of the user requesting password reset.",
    example: "johndoe@example.com",
  })
  @IsEmail()
  email: string;
}
