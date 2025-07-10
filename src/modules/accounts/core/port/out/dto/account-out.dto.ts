import { ApiProperty } from "@nestjs/swagger";

export class AccountResponseDTO {
  @ApiProperty({
    description: "Unique identifier of the account",
    example: "a3f1b55c-91cb-4b71-b7fc-1a3e9c72381f",
  })
  id: string;

  @ApiProperty({
    description: "Email address associated with the account",
    example: "customer@example.com",
  })
  email: string;

  @ApiProperty({
    description: "Indicates whether the email has been verified",
    example: false,
  })
  isEmailVerified: boolean;

  @ApiProperty({
    description: "Timestamp of when the account was created (ISO 8601 format)",
    example: "2024-07-07T15:30:00.000Z",
  })
  createdAt: string;

  @ApiProperty({
    description: "Timestamp of the last account update, if applicable",
    example: "2024-07-08T18:45:00.000Z",
    nullable: true,
  })
  updatedAt: string | null;
}
