import { Entity, UniqueEntityID } from "@/shared/domain";
import { Optional } from "@/shared/types";

export interface AccountProps {
  email: string;
  password: string;
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class AccountEntity extends Entity<AccountProps> {
  static create(
    props: Optional<AccountProps, "isEmailVerified" | "createdAt">,
    id?: UniqueEntityID,
  ) {
    const account = new AccountEntity(
      {
        ...props,
        isEmailVerified: props.isEmailVerified ?? false,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return account;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  get email(): string {
    return this.props.email;
  }

  get isEmailVerified(): boolean {
    return this.props.isEmailVerified;
  }

  set isEmailVerified(value: boolean) {
    this.props.isEmailVerified = value;
    this.touch();
  }

  get password(): string {
    return this.props.password;
  }

  set password(value: string) {
    this.props.password = value;
    this.touch();
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date | null | undefined {
    return this.props.updatedAt;
  }
}
