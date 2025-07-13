import { Module } from "@nestjs/common";

import { AccountsModule } from "@/accounts/accounts.module";
import { EnvModule } from "@/config/env/env.module";
import {
  CreateSessionController,
  CreateSessionImplController,
  DeleteSessionController,
  DeleteSessionImplController,
  GetSessionsController,
  GetSessionsImplController,
  RefreshSessionController,
  RefreshSessionImplController,
} from "@/sessions/api/rest";
import {
  CreateSessionService,
  DeleteSessionService,
  GetSessionsService,
  RefreshSessionService,
} from "@/sessions/core/application";
import { AuthModule } from "@/sessions/infrastructure/auth";
import {
  BcryptHashComparer,
  JwtEncrypter,
} from "@/sessions/infrastructure/cryptography";
import {
  MongoSessionRepository,
  mongoSessionSchema,
} from "@/sessions/infrastructure/persistence";
import { MongooseService } from "@/shared/infrastructure";

@Module({
  imports: [
    AuthModule,
    AccountsModule,
    EnvModule,
    MongooseService.withSchemas({
      name: "sessions",
      schema: mongoSessionSchema,
    }),
  ],
  controllers: [
    CreateSessionController,
    RefreshSessionController,
    DeleteSessionController,
    GetSessionsController,
  ],
  providers: [
    MongooseService,

    // Controller Implementation
    CreateSessionImplController,
    RefreshSessionImplController,
    DeleteSessionImplController,
    GetSessionsImplController,

    // Adapters (PortOut)
    MongoSessionRepository,

    // PortIn Implementation
    {
      provide: "CreateSessionPortIn",
      useClass: CreateSessionService,
    },
    {
      provide: "RefreshSessionPortIn",
      useClass: RefreshSessionService,
    },
    {
      provide: "DeleteSessionPortIn",
      useClass: DeleteSessionService,
    },
    {
      provide: "GetSessionsPortIn",
      useClass: GetSessionsService,
    },

    // PortOut bindings
    {
      provide: "SessionsPortOut",
      useClass: MongoSessionRepository,
    },
    {
      provide: "EncrypterPortOut",
      useClass: JwtEncrypter,
    },
    {
      provide: "HashComparerPortOut",
      useClass: BcryptHashComparer,
    },
  ],
})
export class SessionsModule {}
