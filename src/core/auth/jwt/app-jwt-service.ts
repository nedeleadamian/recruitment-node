import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../../../api/user/entity/user.entity';
import { IAuthUser } from './dto/IAuthUser';

@Injectable()
export class AppJwtService {
  constructor(private readonly jwtService: JwtService) {}

  private static formatJwtPayload(user: UserEntity): IAuthUser {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
  }

  public generateAccessToken(userJwt: IAuthUser): string {
    return this.jwtService.sign(userJwt);
  }

  public verify(token: string) {
    return this.jwtService.verify(token);
  }
}
