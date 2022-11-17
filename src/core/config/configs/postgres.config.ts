import { registerAs } from '@nestjs/config';

export const PostgresConfig = registerAs('postgres', () => ({
  dbName: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  port: Number(process.env.POSTGRES_PORT),
  host: process.env.POSTGRES_HOST,
  hostDocker: process.env.POSTGRES_HOST_DOCKER,
  version: process.env.POSTGRES_VERSION,
}));
