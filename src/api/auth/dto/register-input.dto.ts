import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterInputDto {
  @IsNotEmpty()
  @IsString()
  public readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  public readonly lastName: string;

  @IsNotEmpty()
  @IsEmail()
  public readonly email: string;

  @IsNotEmpty()
  @IsString()
  public readonly password: string;
}
