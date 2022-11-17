import { Module } from '@nestjs/common';
import { CountryModule } from './country/country.module';

const CHILD_MODULES = [CountryModule];

@Module({
  imports: [...CHILD_MODULES],
  exports: [...CHILD_MODULES],
})
export class AddressModule {}
