import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Providers } from 'src/shared/application/constants/providers';
import { EnvConfigService } from './env-config.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.development'],
    }),
  ],
  providers: [
    {
      provide: Providers.ENV_CONFIG,
      useFactory: (configService: ConfigService) => {
        return new EnvConfigService(configService);
      },
      inject: [ConfigService],
    },
  ],
  exports: [Providers.ENV_CONFIG],
})
export class EnvConfigModule {}
