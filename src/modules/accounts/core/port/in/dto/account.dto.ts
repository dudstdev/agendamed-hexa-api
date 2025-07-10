import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

import { IsPassword } from "@/shared/infrastructure";

export class AccountRequestDTO {
  @ApiProperty({
    description: "Email address of the user.",
    example: "johndoe@email.com",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description:
      "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one symbol.",
    example: "StrongPass123@",
  })
  @IsPassword()
  password: string;
}
