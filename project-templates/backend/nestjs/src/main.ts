import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/all-exception.filter';
import logger from './controllers/logger';
import config from './config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(config.port);
  logger.info(new Date().toLocaleString());
  logger.info(`Service Loaded(nestjs-template)`);
  logger.info('Port', String(config.port));
}
bootstrap().catch(e => {
  // eslint-disable-next-line no-console
  console.error(e);
  logger.error(e?.message || 'bootstrap error');
});
