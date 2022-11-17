import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AbstractPaginationDto } from '@abstraction/dto/abstract-pagination.dto';
import { IAuthUser } from '@core/auth';
import { CarbonCertificateResultDto } from './dto/carbon-certificate-result.dto';
import { CarbonCertificateRepository } from './repository/carbon-certificate.repository';

@Injectable()
export class CarbonCertificateService {
  constructor(public readonly repo: CarbonCertificateRepository) {}

  public async findCarbonCertificates(
    { limit, page }: AbstractPaginationDto,
    userId?: number,
  ): Promise<CarbonCertificateResultDto> {
    const qb = this.repo.getBaseQueryBuilder();

    qb.leftJoinAndSelect(`${this.repo.baseAlias}.owner`, 'owner');

    if (userId) {
      qb.andWhere(`"${this.repo.baseAlias}".owner_id = :userId`, {userId});
    }

    this.repo.setPagination(limit, page, qb);

    return this.repo.findMany(qb);
  }

  public async transferCertificate(
    authUser: IAuthUser,
    certificateId: number,
    targetUserId: number,
  ): Promise<boolean> {
    const dbCertificate = await this.repo.findOne({
      where: { id: certificateId },
      select: ['ownerId'],
    });
    const dbTargetUser = await this.repo.getRepository().count({
      where: { id: targetUserId },
    });

    if (!dbCertificate) {
      throw new HttpException('Certificate not found', HttpStatus.BAD_REQUEST);
    }

    if (dbCertificate.ownerId !== authUser.id) {
      throw new HttpException(
        'You are not owner of this certificate',
        HttpStatus.FORBIDDEN,
      );
    }

    if (!dbTargetUser) {
      throw new HttpException('Target user not found', HttpStatus.BAD_REQUEST);
    }

    const result = await this.repo.getRepository().update(certificateId, {
      ownerId: targetUserId,
    });

    return !!result.affected;
  }
}
