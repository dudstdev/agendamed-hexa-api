import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class AccountConfirmationDTO {
  @ApiProperty({
    description: "Email address used to request account confirmation.",
    example: "johndoe@email.com",
  })
  @IsEmail()
  email: string;
}
