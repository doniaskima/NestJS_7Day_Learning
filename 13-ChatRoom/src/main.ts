import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ApplicationModule } from './modules/app.module';

async function bootstrap() {
  const app =
    await NestFactory.create<NestExpressApplication>(ApplicationModule);

  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');
  await app.listen(3000);
}
bootstrap();
