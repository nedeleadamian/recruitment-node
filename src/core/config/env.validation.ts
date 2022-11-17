import { plainToInstance } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsString,
  validateSync,
} from 'class-validator';

export enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Staging = 'staging',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  // APP
  @IsString()
  COMPOSE_PROJECT_NAME: string;

  @IsString()
  APP_NAME: string;

  @IsBoolean()
  APP_SEED: boolean;

  @IsNumber()
  SERVER_PORT: number;

  @IsString()
  SERVER_FULL_HOST: string;

  // AUTH
  @IsString()
  JWT_SECRET: string;

  @IsNumber()
  JWT_EXPIRE: number;

  // POSTGRES
  @IsString()
  POSTGRES_DB: string;

  @IsString()
  POSTGRES_PASSWORD: string;

  @IsString()
  POSTGRES_USER: string;

  @IsNumber()
  POSTGRES_PORT: number;

  @IsString()
  POSTGRES_HOST_DOCKER: string;

  @IsString()
  POSTGRES_HOST: string;

  @IsString()
  POSTGRES_VERSION: string;
}

export function validateEnvironment(
  config: Record<string, unknown>,
): EnvironmentVariables {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
