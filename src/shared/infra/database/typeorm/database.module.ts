import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvConfigModule } from '../../env-config/env-config.module';
import { Providers } from 'src/shared/application/constants/providers';
import { EnvConfig } from 'src/shared/application/env-config/env-config';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvConfigModule],
      inject: [Providers.ENV_CONFIG],
      useFactory: (configService: EnvConfig) => ({
        type: 'postgres',
        host: configService.getDbHost(),
        port: configService.getDbPort(),
        username: configService.getDbUsername(),
        password: configService.getDbPassword(),
        database: configService.getDbName(),
        autoLoadEntities: false,
        synchronize: false,
        logging: configService.getNodeEnv() !== 'prod',
        entities: [
          __dirname + '/../../../../core/**/infra/typeorm/schema/*.{ts,js}',
        ],
        migrations: [__dirname + '/migrations/*.{ts,js}'],
        migrationsRun: true,
      }),
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        return addTransactionalDataSource(new DataSource(options));
      },
    }),
  ],
})
export class DatabaseModule {}
