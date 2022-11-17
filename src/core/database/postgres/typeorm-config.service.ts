import { Inject, Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigType } from '@nestjs/config';
import { BaseConfig, PostgresConfig } from '../../config';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(
    @Inject(PostgresConfig.KEY)
    private readonly postgresConfig: ConfigType<typeof PostgresConfig>,
    @Inject(BaseConfig.KEY)
    private readonly baseConfig: ConfigType<typeof BaseConfig>,
  ) {}

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.postgresConfig.host,
      port: this.postgresConfig.port,
      username: this.postgresConfig.user,
      password: this.postgresConfig.password,
      database: this.postgresConfig.dbName,
      entities: [__dirname + '/../../../api/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: !this.baseConfig.isProduction,
    };
  }
}
