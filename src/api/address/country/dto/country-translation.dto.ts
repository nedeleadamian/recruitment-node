import { ApiProperty } from '@nestjs/swagger';
import { AbstractTranslationDto } from '@abstraction/dto/abstract-translation.dto';

export class CountryTranslationDto extends AbstractTranslationDto {
  @ApiProperty()
  public name: string;
}
