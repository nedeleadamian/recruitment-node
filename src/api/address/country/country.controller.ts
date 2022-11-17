import { Controller, Get, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AbstractPaginationDto } from '@abstraction/dto/abstract-pagination.dto';
import { CountryService } from './country.service';
import { CountryResultDto } from './dto/country-result.dto';

@ApiTags('country')
@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  @ApiResponse({ type: CountryResultDto, isArray: false })
  public async countries(
    @Query() query: AbstractPaginationDto,
  ): Promise<CountryResultDto> {
    return this.countryService.findCountries(query);
  }
}
