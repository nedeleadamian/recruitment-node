import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarbonCertificateService } from './carbon-certificate.service';
import { CarbonCertificateRepository } from './repository/carbon-certificate.repository';
import { CarbonCertificateController } from './carbon-certificate.controller';
import { CarbonCertificateEntity } from './entity/carbon-certificate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CarbonCertificateEntity])],
  controllers: [CarbonCertificateController],
  providers: [CarbonCertificateService, CarbonCertificateRepository],
  exports: [CarbonCertificateService],
})
export class CarbonCertificateModule {}
