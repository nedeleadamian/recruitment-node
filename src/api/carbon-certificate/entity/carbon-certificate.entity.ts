import { AbstractEntity } from '@abstraction/entity/abstract.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from '../../user/entity/user.entity';
import { CountryEntity } from '../../address/country/entity/country.entity';
import { CarbonCertificateStatusEnum } from '../enum/carbon-certificate-status.enum';

@Entity({ name: 'carbon_certificate' })
export class CarbonCertificateEntity extends AbstractEntity {
  @Column('enum', {
    default: CarbonCertificateStatusEnum.AVAILABLE,
    enum: CarbonCertificateStatusEnum,
  })
  public status: CarbonCertificateStatusEnum;

  @Column('int', { name: 'country_id', select: false })
  public countryId: number;

  @ManyToOne(() => CountryEntity, (e) => e.carbonCertificates)
  @JoinColumn([{ name: 'country_id' }])
  public country: CountryEntity;

  @Column('int', { name: 'owner_id', select: false, nullable: true })
  public ownerId?: number;

  @ManyToOne(() => UserEntity, (e) => e.carbonCertificates)
  @JoinColumn([{ name: 'owner_id' }])
  public owner?: UserEntity;
}
