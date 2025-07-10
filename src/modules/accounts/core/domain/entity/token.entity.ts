import { Entity, UniqueEntityID } from "@/shared/domain";

export enum TokenType {
  EMAIL_CONFIRMATION = "EMAIL_CONFIRMATION",
  PASSWORD_RESET = "PASSWORD_RESET",
}

export interface TokenProps {
  accountId: UniqueEntityID;
  code: string;
  type: TokenType;
  expiresAt: Date;
}

export class TokenEntity extends Entity<TokenProps> {
  static create(props: TokenProps, id?: UniqueEntityID) {
    const token = new TokenEntity(props, id);

    return token;
  }

  isExpired(): boolean {
    return new Date() > this.expiresAt;
  }

  get accountId(): UniqueEntityID {
    return this.props.accountId;
  }

  get code(): string {
    return this.props.code;
  }

  get type(): TokenType {
    return this.props.type;
  }

  get expiresAt(): Date {
    return this.props.expiresAt;
  }
}
