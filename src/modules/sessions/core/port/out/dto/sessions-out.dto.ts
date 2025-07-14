import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsOptional, IsString } from "class-validator";

export class SessionsOutResponseDTO {
  @ApiProperty({
    description: "Unique identifier of the session.",
    example: "a3edc5ca-8a6b-49be-aa82-9c479557a1b8",
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: "Account ID associated with this session.",
    example: "e301c692-139f-4c2a-9143-7178656a48b3",
  })
  @IsString()
  accountId: string;

  @ApiProperty({
    description: "Client ID (device or app) that originated the session.",
    example: "web-app",
  })
  @IsString()
  clientId: string;

  @ApiProperty({
    description: "Refresh token associated with this session.",
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  })
  @IsString()
  refreshToken: string;

  @ApiProperty({
    description: "Date and time when the session was created.",
    example: "2025-07-13T00:34:44.656Z",
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: "Date and time when the session will expire.",
    example: "2025-08-13T00:34:44.656Z",
  })
  @IsDate()
  expiresAt: Date;

  @ApiProperty({
    description: "Date and time when the session was revoked (if applicable).",
    example: "2025-07-20T15:00:00.000Z",
  })
  @IsOptional()
  @IsDate()
  revokedAt?: Date | null;

  @ApiProperty({
    description: "IP address used when the session was created.",
    example: "192.168.1.10",
  })
  @IsOptional()
  @IsString()
  ipAddress?: string | null;

  @ApiProperty({
    description:
      "User agent (browser or device info) used to create the session.",
    example: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)...",
  })
  @IsOptional()
  @IsString()
  userAgent?: string | null;
}

export class SessionsListOutResponseDTO {
  @ApiProperty({ type: [SessionsOutResponseDTO] })
  sessions: SessionsOutResponseDTO[];
}
