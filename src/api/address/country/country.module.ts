import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryEntity } from './entity/country.entity';
import { CountryService } from './country.service';
import { CountryTranslationEntity } from './entity/country-translation.entity';
import { CountryController } from './country.controller';

const PROVIDERS = [CountryService];
const ENTITIES = [CountryEntity, CountryTranslationEntity];
const CHILD_MODULES = [];

@Module({
  imports: [TypeOrmModule.forFeature([...ENTITIES]), ...CHILD_MODULES],
  controllers: [CountryController],
  providers: [...PROVIDERS],
  exports: [...PROVIDERS],
})
export class CountryModule {}
