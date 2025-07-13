import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString } from "class-validator";

export class SessionRequestDTO {
  @ApiProperty({
    description: "User email used for authentication.",
    example: "johndoe@example.com",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "User password used for authentication.",
    example: "StrongPassword123@",
  })
  @IsString()
  password: string;

  @ApiProperty({
    description:
      "Client identifier for the application or device making the request.",
    example: "b53c5ce7b6084b53975bd7321dc19533",
  })
  @IsString()
  clientId: string;

  @ApiProperty({
    description: "IP address from which the user is logging in.",
    example: "192.168.0.1",
  })
  @IsString()
  @IsOptional()
  ipAddress: string;

  @ApiProperty({
    description:
      "User agent string of the browser or client making the request.",
    example: "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_5_2)...",
  })
  @IsString()
  @IsOptional()
  userAgent: string;
}
