import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from '@abstraction/dto/abstract.dto';
import { CountryDto } from '../../address/country/dto/country.dto';
import { UserDto } from '../../user/dto/user.dto';
import { CarbonCertificateStatusEnum } from '../enum/carbon-certificate-status.enum';

export class CarbonCertificateDto extends AbstractDto {
  @ApiProperty({ enum: CarbonCertificateStatusEnum })
  public status: CarbonCertificateStatusEnum;

  @ApiProperty()
  public country: CountryDto;

  @ApiProperty()
  public owner?: UserDto;
}
