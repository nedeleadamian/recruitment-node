import { AbstractEntity } from '@abstraction/entity/abstract.entity';
import { PasswordTransformer } from '@core/database/postgres/transformers/password.transformer';
import { Column, Entity, OneToMany } from 'typeorm';
import { CarbonCertificateEntity } from '../../carbon-certificate/entity/carbon-certificate.entity';

@Entity({ name: 'user' })
export class UserEntity extends AbstractEntity {
  @Column('varchar', { length: 50, name: 'first_name' })
  public firstName: string;

  @Column('varchar', { length: 50, name: 'last_name' })
  public lastName: string;

  @Column('varchar', { length: 50, name: 'email', unique: true })
  public email: string;

  @Column('varchar', {
    name: 'password',
    select: false,
    transformer: new PasswordTransformer(),
  })
  public password: string;

  @OneToMany(() => CarbonCertificateEntity, (e) => e.owner, {
    cascade: ['insert', 'update'],
    onDelete: 'CASCADE',
  })
  public carbonCertificates: CarbonCertificateEntity[];
}
