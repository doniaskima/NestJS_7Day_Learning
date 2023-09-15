import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ApplicationModule } from './modules/app.module';
import * as ejs from 'ejs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(ApplicationModule);

  // Set the view engine to EJS
  app.setViewEngine('ejs');

  await app.listen(3000);
}
bootstrap();
