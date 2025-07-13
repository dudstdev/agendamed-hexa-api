import z from "zod";

export const envSchema = z.object({
  PORT: z.coerce.number().optional().default(3000),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  DATABASE_URL: z.string().url(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
  MONGO_INITDB_ROOT_USERNAME: z.string(),
  MONGO_INITDB_ROOT_PASSWORD: z.string(),
  MONGO_URI: z.string(),
  MONGO_DATABASE: z.string(),
  REDIS_HOST: z.string().default("localhost"),
  REDIS_PORT: z.string().default("6379").transform(Number),
  REDIS_DB: z.coerce.number().optional().default(0),
  JWT_PRIVATE_KEY: z.string(),
  JWT_PUBLIC_KEY: z.string(),
});

export type Env = z.infer<typeof envSchema>;
