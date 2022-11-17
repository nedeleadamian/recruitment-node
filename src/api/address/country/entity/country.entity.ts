import { AbstractEntity } from '@abstraction/entity/abstract.entity';
import { Entity, OneToMany } from 'typeorm';
import { CarbonCertificateEntity } from '../../../carbon-certificate/entity/carbon-certificate.entity';
import { CountryTranslationEntity } from './country-translation.entity';

@Entity({ name: 'country' })
export class CountryEntity extends AbstractEntity {

  @OneToMany(() => CountryTranslationEntity, e => e.country, {
    cascade: ['insert', 'update'],
    onDelete: 'CASCADE'
  })
  public translations: CountryTranslationEntity[];


  @OneToMany(() => CarbonCertificateEntity, (e) => e.country, {
    cascade: ['insert', 'update'],
    onDelete: 'CASCADE',
  })
  public carbonCertificates: CarbonCertificateEntity[];

}
