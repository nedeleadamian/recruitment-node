import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AddressModule } from './address/address.module';
import { SeedModule } from './seed/seed.module';
import { CarbonCertificateModule } from './carbon-certificate/carbon-certificate.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    AddressModule,
    SeedModule,
    CarbonCertificateModule,
  ],
})
export class ApiModule {}
