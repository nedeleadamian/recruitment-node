import { Module } from '@nestjs/common';
import { TypeOrmConfigService } from './typeorm-config.service';
import { TypeOrmCoreModule } from '@nestjs/typeorm/dist/typeorm-core.module';

@Module({
  imports: [TypeOrmCoreModule.forRootAsync({ useClass: TypeOrmConfigService })],
})
export class PostgresModule {}
