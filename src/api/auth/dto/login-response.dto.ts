import { ApiProperty } from '@nestjs/swagger';
import { TokenDto } from './token.dto';

export class LoginResponseDto {
  @ApiProperty()
  public id: number;
  @ApiProperty()
  public firstName?: string;
  @ApiProperty()
  public lastName?: string;
  @ApiProperty()
  public email: string;
  
  @ApiProperty()
  public tokens: TokenDto;
}
