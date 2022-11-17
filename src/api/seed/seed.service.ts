import { ConfigType } from '@nestjs/config';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { BaseConfig } from '@core/config';
import { faker } from '@faker-js/faker';
import { EntityManager, getManager, MoreThan, Not } from 'typeorm';
import { CountryEntity } from '../address/country/entity/country.entity';
import { UserEntity } from '../user/entity/user.entity';
import { LocaleEnum } from '../../common/constants';
import { CarbonCertificateEntity } from '../carbon-certificate/entity/carbon-certificate.entity';
import { CarbonCertificateStatusEnum } from '../carbon-certificate/enum/carbon-certificate-status.enum';
import { SeedDto } from './dto/seed.dto';

@Injectable()
export class SeedService {
  private readonly logger: Logger = new Logger(SeedService.name);

  constructor(
    @Inject(BaseConfig.KEY)
    private readonly baseConfig: ConfigType<typeof BaseConfig>,
  ) {}

  public async seed(body: SeedDto): Promise<void> {
    if (this.baseConfig.seed && !this.baseConfig.isProduction) {
      this.logger.debug('Init database seeding...');
      await getManager().transaction(async (em) => {
        const countries = await this.seedCountries(em, body.countriesNr);
        const users = await this.seedUsers(em, body.usersNr);

        await this.seedCarbonCertificates(
          em,
          body.carbonCertificatesNr,
          countries,
          users,
        );
        // const categories = await this.seedCategories(em);
        // const tags = await SeedService.seedTags(em);
        // const products = await this.seedProducts(em, categories, tags, users);
        // await this.seedSwapRequests(em, products);
        // await this.seedUserReviews(em, users);
      });
      this.logger.debug('Database seeding complete!');
    }
  }

  private async seedCountries(
    em: EntityManager,
    count: number,
  ): Promise<CountryEntity[]> {
    await em.delete(CountryEntity, { id: MoreThan(0) });

    const countries: CountryEntity[] = [];

    for (let i = 0; i < count; i++) {
      const country = new CountryEntity();
      country.translations = [];
      for (const value of Object.values(LocaleEnum)) {
        const translation = {
          locale: value,
          name: faker.lorem.words(5),
        };

        country.translations.push(translation);
      }

      countries.push(country);
    }

    return await em.save<CountryEntity>(countries);
  }

  private async seedUsers(
    em: EntityManager,
    count: number,
  ): Promise<UserEntity[]> {
    await em.delete(UserEntity, { id: MoreThan(0) });

    const users: UserEntity[] = [];

    const baseUser = new UserEntity();
    baseUser.firstName = 'John';
    baseUser.lastName = 'Doe';
    baseUser.email = 'admin@admin.com';
    baseUser.password = 'admin123';
    users.push(baseUser);

    for (let i = 0; i < count; i++) {
      const user = new UserEntity();
      user.firstName = faker.name.firstName();
      user.lastName = faker.name.lastName();
      user.email = faker.internet.email(user.firstName, user.lastName);
      user.password = 'admin123';

      users.push(user);
    }

    return await em.save<UserEntity>(users);
  }

  private async seedCarbonCertificates(
    em: EntityManager,
    count: number,
    countries: CountryEntity[],
    users: UserEntity[],
  ): Promise<CarbonCertificateEntity[]> {
    await em.delete(CarbonCertificateEntity, { id: MoreThan(0) });

    const certificates = [];
    const statusEnumArray = Object.values(CarbonCertificateStatusEnum);

    for (let i = 0; i < count; i++) {
      const certificate = new CarbonCertificateEntity();
      certificate.status =
        statusEnumArray[Math.floor(Math.random() * statusEnumArray.length)];

      if (
        [
          CarbonCertificateStatusEnum.OWNED,
          CarbonCertificateStatusEnum.TRANSFERRED,
        ].includes(certificate.status)
      ) {
        const user = users[Math.floor(Math.random() * users.length)];
        certificate.ownerId = user.id;
      }
      const country = countries[Math.floor(Math.random() * countries.length)];
      certificate.countryId = country.id;

      certificates.push(certificate);
    }

    return em.save<CarbonCertificateEntity>(certificates);
  }
}
