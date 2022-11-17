import { CreateDateColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { LocaleEnum } from '../../constants';

export abstract class BaseTranslationEntity {
  @CreateDateColumn({ name: 'created_at' })
  public createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt?: Date;

  @PrimaryColumn('enum', { enum: LocaleEnum })
  public locale: LocaleEnum;
}
