import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';
import { DatabaseModule } from './database/database.module';
import { EmailModule } from './email/email.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.ENV}`],
      isGlobal: true,
      load: [configuration],
    }),
    UsersModule,
    AuthModule,
    DatabaseModule,
    EmailModule,
    ProductsModule,
  ],
})
export class AppModule {}
