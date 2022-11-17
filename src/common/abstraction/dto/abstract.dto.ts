import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export abstract class AbstractDto {
  @ApiProperty()
  public id: number;
  @ApiPropertyOptional()
  public createdAt?: string | Date;
  @ApiPropertyOptional()
  public updatedAt?: string | Date;
}
