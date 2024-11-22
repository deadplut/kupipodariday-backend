import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseConfig } from './config/database.config';
import { validationSchema } from './config/validation.config';

@Module({
  imports: [
    // Подключение ConfigModule с валидацией
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
    }),

    // Подключение TypeOrmModule
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        getDatabaseConfig(configService),
    }),
  ],
})
export class AppModule {}
