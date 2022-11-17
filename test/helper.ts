import { getRepositoryToken } from '@nestjs/typeorm';
import { Abstract, ClassProvider, Provider, Type, ValueProvider } from '@nestjs/common';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { createStubInstance, SinonStubbedInstance } from 'sinon';

export function createSinonMockRepository<T extends EntityClassOrSchema>(entity: T): Provider {
  const repoStub: SinonStubbedInstance<Repository<T>> = createStubInstance(Repository);
  return {
    provide: getRepositoryToken(entity),
    useValue: repoStub,
  };
}
export function createMockRepository<T extends EntityClassOrSchema>(entity: T): ClassProvider {
  return {
    provide: getRepositoryToken(entity),
    useClass: Repository,
  };
}
export function createMockProvider(
  provide: string | symbol | Type | Abstract<unknown>,
  useValue = {},
): ValueProvider {
  return {
    provide,
    useValue,
  };
}
export function mockQueryBuilder<T = unknown>(returnValue: T | T[] | undefined): SelectQueryBuilder<T> {
  const arrayValue = Array.isArray(returnValue) ? returnValue : [];
  return (jest.fn(() => ({
    delete: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    execute: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    addSelect: jest.fn().mockReturnThis(),
    orWhere: jest.fn().mockReturnThis(),
    getManyAndCount: jest.fn().mockResolvedValue([arrayValue, arrayValue.length]),
    getMany: jest.fn().mockResolvedValue(arrayValue),
  }))() as unknown) as SelectQueryBuilder<T>;
}