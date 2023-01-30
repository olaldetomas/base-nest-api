import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';
import { Constants } from './constants';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [Constants.devEnv, Constants.prodEnv, Constants.localEnv],
      isGlobal: true,
      load: [configuration],
    }),
    UsersModule,
    AuthModule,
    DatabaseModule,
  ],
})
export class AppModule {}
