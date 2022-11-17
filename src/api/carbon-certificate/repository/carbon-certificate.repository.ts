import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '@core/database/postgres/base.repository';
import { Repository } from 'typeorm';
import { CarbonCertificateEntity } from '../entity/carbon-certificate.entity';

@Injectable()
export class CarbonCertificateRepository extends BaseRepository<CarbonCertificateEntity> {
  baseAlias: string = CarbonCertificateEntity.name;

  constructor(
    @InjectRepository(CarbonCertificateEntity)
    public readonly repo: Repository<CarbonCertificateEntity>,
  ) {
    super(repo);
  }
}
