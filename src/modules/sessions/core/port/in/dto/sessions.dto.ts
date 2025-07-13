import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class SessionsDTO {
  @ApiProperty({
    description:
      "The unique identifier of the account whose sessions you want to retrieve.",
    example: "e301c692-139f-4c2a-9143-7178656a48b3",
  })
  @IsString()
  accountid: string;
}
