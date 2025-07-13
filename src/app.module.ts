import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AccountsModule } from "@/accounts/accounts.module";
import { envSchema } from "@/config/env/handler";
import { SessionsModule } from "@/sessions/sessions.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (env) => envSchema.parse(env),
    }),
    AccountsModule,
    SessionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
