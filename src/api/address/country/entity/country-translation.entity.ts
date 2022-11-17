import { BaseTranslationEntity } from '@abstraction/entity/base-translation.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { CountryEntity } from './country.entity';

@Entity({ name: 'country_translation' })
export class CountryTranslationEntity extends BaseTranslationEntity {
  @Column('varchar', { length: 100 })
  public name: string;

  @PrimaryColumn('int', { name: 'country_id', select: false })
  public countryId?: number;

  @ManyToOne(() => CountryEntity, (e) => e.translations, {
    primary: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'country_id' }, { name: 'locale' }])
  public readonly country?: CountryEntity;
}
