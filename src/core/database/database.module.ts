import { Module } from '@nestjs/common';
import { PostgresModule } from './postgres/postgres.module';

const MODULES = [PostgresModule];

@Module({
  imports: [...MODULES],
  exports: [...MODULES],
})
export class DatabaseModule {}
