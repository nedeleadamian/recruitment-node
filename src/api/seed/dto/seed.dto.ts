import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class SeedDto {
  @ApiProperty()
  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  public usersNr: number;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  public countriesNr: number;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  public carbonCertificatesNr: number;
}
