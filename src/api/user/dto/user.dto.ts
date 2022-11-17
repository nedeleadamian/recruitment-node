import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from '@abstraction/dto/abstract.dto';
import { CarbonCertificateDto } from '../../carbon-certificate/dto/carbon-certificate.dto';

export class UserDto extends AbstractDto {
  @ApiProperty()
  public firstName: string;
  @ApiProperty()
  public lastName: string;
  @ApiProperty()
  public email: string;

  @ApiProperty()
  public carbonCertificates: CarbonCertificateDto[];
}
