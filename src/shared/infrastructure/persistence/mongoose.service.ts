import {
  DynamicModule,
  Module,
  OnModuleDestroy,
  OnModuleInit,
  Provider,
} from "@nestjs/common";
import { Mongoose, Schema } from "mongoose";

import { EnvService } from "@/config/env/env.service";

interface SchemaDefinition {
  name: string;
  schema: Schema;
  discriminators?: SchemaDefinition[];
}

@Module({})
export class MongooseService implements OnModuleInit, OnModuleDestroy {
  private readonly mongoose = new Mongoose();
  private static readonly SCHEMAS_KEY = "MONGOOSE_SCHEMAS";
  private readonly schemas: SchemaDefinition[];

  constructor(private readonly env: EnvService) {
    this.schemas =
      (Reflect.getMetadata(
        MongooseService.SCHEMAS_KEY,
        MongooseService,
      ) as SchemaDefinition[]) || [];
  }

  static withSchemas(...schemas: SchemaDefinition[]): DynamicModule {
    Reflect.defineMetadata(
      MongooseService.SCHEMAS_KEY,
      schemas,
      MongooseService,
    );

    const providers: Provider[] = [MongooseService, EnvService];

    return {
      module: MongooseService,
      providers,
      exports: providers,
    };
  }

  async onModuleInit() {
    await this.mongoose.connect(this.env.get("MONGO_URI"), {
      dbName: this.env.get("MONGO_DATABASE"),
    });

    const conn = this.mongoose.connection;

    for (const { name, schema, discriminators } of this.schemas) {
      if (!conn.models[name]) {
        const model = conn.model(name, schema);

        if (discriminators) {
          for (const discriminator of discriminators) {
            model.discriminator(discriminator.name, discriminator.schema);
          }
        }
      }
    }
  }

  async onModuleDestroy() {
    await this.mongoose.disconnect();
  }

  getConnectionName() {
    return this.mongoose.connection;
  }

  getModel<T = any>(name: string) {
    return this.mongoose.model<T>(name);
  }

  get models() {
    return this.mongoose.models;
  }
}
