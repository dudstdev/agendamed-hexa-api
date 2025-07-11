import { Entity, UniqueEntityID } from "@/shared/domain";
import { Optional } from "@/shared/types";

export interface SessionProps {
  accountId: UniqueEntityID;
  clientId: string;
  refreshToken: string;
  createdAt: Date;
  expiresAt: Date;
  revokedAt?: Date;
  ipAddress?: string;
  userAgent?: string;
}

export class SessionEntity extends Entity<SessionProps> {
  static create(
    props: Optional<SessionProps, "createdAt">,
    id?: UniqueEntityID,
  ) {
    const session = new SessionEntity(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return session;
  }

  get accountId(): UniqueEntityID {
    return this.props.accountId;
  }

  get clientId(): string {
    return this.props.clientId;
  }

  get refreshToken(): string {
    return this.props.refreshToken;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get expiresAt(): Date {
    return this.props.expiresAt;
  }

  get revokedAt(): Date | undefined {
    return this.props.revokedAt;
  }

  get ipAddress(): string | undefined {
    return this.props.ipAddress;
  }

  get userAgent(): string | undefined {
    return this.props.userAgent;
  }
}
