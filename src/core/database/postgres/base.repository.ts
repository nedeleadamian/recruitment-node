import { BadRequestException, NotFoundException } from '@nestjs/common';
import { SortDto } from '@abstraction/dto/abstract-pagination.dto';
import {
  DeepPartial,
  FindOneOptions,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { ObjectID } from 'typeorm/driver/mongodb/typings';
import { FindConditions } from 'typeorm/find-options/FindConditions';
import { PAGINATION_CONST } from '../../../common/constants';

export interface FindAndCountResult<T> {
  items: T[];
  count: number;
}

interface IUpdateEntityOptions {
  primaryKey?: string;
}

interface IColumnTypeResponse {
  columnName: string;
  isNumber: boolean;
}

export abstract class BaseRepository<Entity> {
  public abstract baseAlias: string;

  constructor(private repository: Repository<Entity>) {}

  public getBaseQueryBuilder(): SelectQueryBuilder<Entity> {
    return this.repository.createQueryBuilder(this.baseAlias);
  }

  public async findMany(
    qb?: SelectQueryBuilder<Entity>,
  ): Promise<FindAndCountResult<Entity>> {
    /* results is remapped via app interceptor */
    const result = await (qb || this.getBaseQueryBuilder()).getManyAndCount();

    return {
      items: result[0],
      count: result[1],
    };
  }

  public async findById(
    entityId: number | string,
    qb?: SelectQueryBuilder<Entity>,
  ): Promise<Entity> {
    const res = await (qb || this.getBaseQueryBuilder())
      .andWhere(
        `${this.repository.metadata.targetName}.${
          this.getPrimaryColumn().columnName
        } = :entityId`,
        { entityId },
      )
      .getOne();
    if (!res) {
      throw new NotFoundException();
    }
    return res;
  }

  public async findOne(
    query: FindOneOptions<Entity>,
  ): Promise<Entity | undefined> {
    return this.repository.findOne(query);
  }

  public create(dto: DeepPartial<Entity>): Promise<Entity> {
    const data = this.repository.create(dto);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.repository.save<Entity>(data);
  }

  public getRepository(): Repository<Entity> {
    return this.repository;
  }

  public update(
    entityId: number | string,
    dto: Partial<Entity>,
    options?: IUpdateEntityOptions,
  ): Promise<Entity> {
    let column;

    if (options && options.primaryKey) {
      column = this.getPrimaryColumn(options.primaryKey);
    } else {
      column = this.getPrimaryColumn();
    }

    dto[column.columnName] = column.isNumber ? +entityId : entityId;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.repository.save<Entity>(dto);
  }

  public async delete(
    criteria:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectID
      | ObjectID[]
      | FindConditions<Entity>,
  ): Promise<boolean> {
    const result = await this.repository.delete(criteria);

    return result.affected === 1;
  }

  public async remove(entityId: Entity): Promise<void> {
    await this.repository.remove(entityId);
  }

  public setPagination(
    limit: number = PAGINATION_CONST.limit,
    page: number = PAGINATION_CONST.page,
    qb: SelectQueryBuilder<Entity>,
  ): void {
    qb.take(limit);
    qb.skip(limit * (page - 1));
  }

  private getPrimaryColumn(primaryKey?: string): IColumnTypeResponse {
    let column;
    if (primaryKey) {
      column = this.repository.metadata.ownColumns.find(
        (value) => value.isPrimary && value.propertyName === primaryKey,
      );
    } else {
      column = this.repository.metadata.ownColumns.find(
        (value) => value.isPrimary,
      );
    }
    if (!column) {
      throw new BadRequestException('Can not find Entity primary column!');
    }
    return {
      columnName: column.propertyName,
      isNumber:
        typeof column.type === 'function' && typeof column.type() === 'number',
    };
  }

  public setSort(sort: SortDto[], qb: SelectQueryBuilder<Entity>): void {
    if (sort && sort.length) {
      sort.forEach(({ field, order }) => {
        qb.addOrderBy(`${this.repository.metadata.targetName}.${field}`, order);
      });
    }
  }
}
