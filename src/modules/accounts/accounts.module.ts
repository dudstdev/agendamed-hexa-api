import { Module } from "@nestjs/common";

import {
  ConfirmAccountController,
  ConfirmAccountImplController,
  CreateAccountController,
  CreateAccountImplController,
  RequestAccountConfirmationController,
  RequestAccountConfirmationImplController,
  RequestPasswordResetController,
  RequestPasswordResetImplController,
  ResetPasswordController,
  ResetPasswordImplController,
} from "@/accounts/api/rest";
import {
  ConfirmAccountService,
  CreateAccountService,
  RequestAccountConfirmationService,
  RequestPasswordResetService,
  ResetPasswordService,
} from "@/accounts/core/application";
import { BcryptHashGenerator } from "@/accounts/infrastructure/cryptography";
import {
  PrismaAccountsRepository,
  RedisTokensRepository,
} from "@/accounts/infrastructure/persistence";
import { EnvModule } from "@/config/env/env.module";
import { PrismaService, RedisService } from "@/shared/infrastructure";

@Module({
  imports: [EnvModule],
  controllers: [
    CreateAccountController,
    RequestAccountConfirmationController,
    ConfirmAccountController,
    RequestPasswordResetController,
    ResetPasswordController,
  ],
  providers: [
    PrismaService,
    RedisService,

    // Controller Implementation
    CreateAccountImplController,
    RequestAccountConfirmationImplController,
    ConfirmAccountImplController,
    RequestPasswordResetImplController,
    ResetPasswordImplController,

    // Adapters (PortOut)
    PrismaAccountsRepository,
    BcryptHashGenerator,

    // PortIn Implementation
    {
      provide: "CreateAccountPortIn",
      useClass: CreateAccountService,
    },
    {
      provide: "RequestAccountConfirmationPortIn",
      useClass: RequestAccountConfirmationService,
    },
    {
      provide: "ConfirmAccountPortIn",
      useClass: ConfirmAccountService,
    },
    {
      provide: "RequestPasswordResetPortIn",
      useClass: RequestPasswordResetService,
    },
    {
      provide: "ResetPasswordPortIn",
      useClass: ResetPasswordService,
    },

    // PortOut bindings
    {
      provide: "AccountsPortOut",
      useClass: PrismaAccountsRepository,
    },
    {
      provide: "TokensPortOut",
      useClass: RedisTokensRepository,
    },
    {
      provide: "HashGeneratorPortOut",
      useClass: BcryptHashGenerator,
    },
  ],
})
export class AccountsModule {}
