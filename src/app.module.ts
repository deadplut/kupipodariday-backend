import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseConfig } from './config/database.config';
import { validationSchema } from './config/validation.config';
import { OffersModule } from './offers/offers.module';
import { UsersModule } from './users/users.module';
import { WishesModule } from './wishes/wishes.module';
import { WishlistsModule } from './wishlists/wishlists.module';

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

    UsersModule,

    WishesModule,

    WishlistsModule,

    OffersModule,
  ],
})
export class AppModule {}
