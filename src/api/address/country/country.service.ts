import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '@core/database/postgres/base.repository';
import { AbstractPaginationDto } from '@abstraction/dto/abstract-pagination.dto';
import { Repository } from 'typeorm';
import { CountryEntity } from './entity/country.entity';
import { CountryResultDto } from './dto/country-result.dto';

@Injectable()
export class CountryService extends BaseRepository<CountryEntity> {
  baseAlias: string = CountryEntity.name;

  constructor(
    @InjectRepository(CountryEntity)
    public readonly repo: Repository<CountryEntity>,
  ) {
    super(repo);
  }

  public async findCountries({
    limit,
    page,
  }: AbstractPaginationDto): Promise<CountryResultDto> {
    const qb = this.getBaseQueryBuilder();

    this.setPagination(limit, page, qb);

    return this.findMany(qb);
  }
}
