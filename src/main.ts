import { json, urlencoded } from 'express';
import { JSON_LIMIT, URL_ENCODE_LIMIT } from 'src/common/constants';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: false,
  });

  const DATABASE_PORT = app.get(ConfigService).get('database.port');
  const PORT = app.get(ConfigService).get('port');

  app.setGlobalPrefix('api');
  app.enableCors();
  app.use(json({ limit: JSON_LIMIT }));
  app.use(urlencoded({ extended: true, limit: URL_ENCODE_LIMIT }));
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  await app.listen(PORT, () => {
    Logger.log(`Database listen on port: ${DATABASE_PORT}`);
    Logger.log(`App listen on port: ${PORT}`);
  });
}
bootstrap();
