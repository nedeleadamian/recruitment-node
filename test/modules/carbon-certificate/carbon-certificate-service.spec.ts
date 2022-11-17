import { NotImplementedException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { CarbonCertificateService } from '../../../src/api/carbon-certificate/carbon-certificate.service';
import { CarbonCertificateEntity } from '../../../src/api/carbon-certificate/entity/carbon-certificate.entity';
import { CarbonCertificateRepository } from '../../../src/api/carbon-certificate/repository/carbon-certificate.repository';
import {
  createMockProvider,
  createMockRepository,
  mockQueryBuilder,
} from '../../helper';

const mockParams = {
  page: 1,
  limit: 1,
};

const notImplementedException = new NotImplementedException();

describe('CarbonCertificateService', () => {
  let carbonCertificateService: CarbonCertificateService;
  let carbonCertificateRepo: CarbonCertificateRepository;
  const baseAlias = CarbonCertificateEntity.name;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CarbonCertificateService,
        createMockRepository(CarbonCertificateEntity),
        createMockProvider(CarbonCertificateRepository),
      ],
    }).compile();

    carbonCertificateService = moduleRef.get<CarbonCertificateService>(
      CarbonCertificateService,
    );
    carbonCertificateRepo = moduleRef.get<CarbonCertificateRepository>(
      CarbonCertificateRepository,
    );
  });

  describe('DI', () => {
    it('service should be defined', () => {
      expect(carbonCertificateService).toBeDefined();
    });

    it('repository should be defined', () => {
      expect(carbonCertificateRepo).toBeDefined();
    });
  });

  describe('Find carbon certificates', () => {
    let queryBuilder = mockQueryBuilder<CarbonCertificateEntity>([]);
    let spyQueryBuilder: jest.SpyInstance;

    beforeEach(() => {
      queryBuilder = mockQueryBuilder<CarbonCertificateEntity>([]);
      spyQueryBuilder = jest
        .spyOn(carbonCertificateRepo, 'getBaseQueryBuilder')
        .mockReturnValue(queryBuilder);
    });

    it('should add condition with userId from args to query builder', async () => {
      const params = {
        page: 1,
        limit: 1,
      };

      expect(
        await carbonCertificateService.findCarbonCertificates(params, 1),
      ).toEqual([[], 0]);
      expect(queryBuilder.andWhere).toHaveBeenCalledWith(
        `"${baseAlias}".owner_id = :userId`,
        {
          userId: 1,
        },
      );
    });

    it('should not add condition with userId to query builder', async () => {
      expect(
        await carbonCertificateService.findCarbonCertificates(mockParams),
      ).toEqual([[], 0]);
      expect(queryBuilder.andWhere).not.toHaveBeenCalledWith(
        `"${baseAlias}".owner_id = :userId`,
        expect.any({}),
      );
    });
  });
});
