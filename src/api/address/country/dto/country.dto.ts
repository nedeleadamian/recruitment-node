import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from '@abstraction/dto/abstract.dto';
import { CountryTranslationDto } from './country-translation.dto';

export class CountryDto extends AbstractDto {
  @ApiProperty()
  public translations: CountryTranslationDto[];
}
