import { DATABASE_TYPE } from 'src/common/constants';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: DATABASE_TYPE,
        host: config.get('database.host'),
        port: config.get('database.port'),
        username: config.get('database.username'),
        password: config.get('database.password'),
        database: config.get('database.name'),
        entities:
          config.get('env') === 'prod'
            ? [__dirname + 'dist/**/*.entity{.ts,.js}']
            : [__dirname + 'src/**/*.entity{.ts,.js}'],
        synchronize: config.get('database.synchronize'),
      }),
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
