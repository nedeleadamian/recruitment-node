import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { AppJwtService, IAuthUser } from '@core/auth';
import { JwtConfig } from '@core/config';
import { compareSync } from 'bcryptjs';
import { getManager } from 'typeorm';
import { UserEntity } from '../user/entity/user.entity';
import { RegisterInputDto } from './dto/register-input.dto';
import { LoginResponseDto } from './dto/login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(JwtConfig.KEY)
    private readonly jwtConfig: ConfigType<typeof JwtConfig>,
    private readonly jwtService: AppJwtService,
  ) {}

  public async authenticate(
    email: string,
    password: string,
  ): Promise<LoginResponseDto> {
    return getManager().transaction(async (em) => {
      const dbUser = await em
        .createQueryBuilder(UserEntity, 'user')
        .where('user.email = :email', { email })
        .addSelect(['user.password'])
        .getOne();

      if (!dbUser) {
        throw new UnauthorizedException();
      }

      if (!this.passwordIsValid(password, dbUser)) {
        throw new UnauthorizedException();
      }

      const authUser: IAuthUser = {
        id: dbUser.id,
        lastName: dbUser.lastName,
        firstName: dbUser.firstName,
        email: dbUser.email,
      };

      return {
        ...authUser,
        tokens: await this.createToken(authUser),
      };
    });
  }

  public async register(input: RegisterInputDto): Promise<LoginResponseDto> {
    const { email, lastName, firstName, password } = input;

    return getManager().transaction(async (em) => {
      let dbUser = await em
        .createQueryBuilder(UserEntity, 'user')
        .where('user.email = :email', { email })
        .leftJoinAndSelect('user.profile', 'profile')
        .getOne();

      if (dbUser) {
        await em.remove(dbUser);
        throw new HttpException('email already exist', HttpStatus.BAD_REQUEST);
      }

      const newUser = new UserEntity();
      newUser.email = email;
      newUser.password = password;

      newUser.lastName = lastName;
      newUser.firstName = firstName;

      dbUser = await em.save<UserEntity>(newUser);

      const authUser: IAuthUser = {
        id: dbUser.id,
        lastName: dbUser.lastName,
        firstName: dbUser.firstName,
        email: dbUser.email,
      };

      return {
        ...authUser,
        tokens: await this.createToken(authUser),
      };
    });
  }

  public createToken(user: IAuthUser): {
    accessToken: string;
    refreshToken?: string;
  } {
    return {
      accessToken: this.jwtService.generateAccessToken(user),
    };
  }

  public passwordIsValid(currentPassword: string, dbUser: UserEntity): boolean {
    return !(!dbUser || !compareSync(currentPassword, dbUser.password));
  }
}
