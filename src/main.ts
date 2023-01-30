import { json, urlencoded } from 'express';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Constants } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: false,
  });

  const DATABASE_PORT = app.get(ConfigService).get('database.port');
  const PORT = app.get(ConfigService).get('port');

  app.enableCors();
  app.use(json({ limit: Constants.jsonLimit }));
  app.use(urlencoded({ extended: true, limit: Constants.urlEncodeLimit }));

  await app.listen(PORT, () => {
    Logger.log(`Database listen on port: ${DATABASE_PORT}`);
    Logger.log(`App listen on port: ${PORT}`);
  });
}
bootstrap();
