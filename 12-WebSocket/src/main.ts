import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import * as path from 'path';
import { ApplicationModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(ApplicationModule);

  // Set the view engine to EJS
  app.setBaseViewsDir(path.join(__dirname, 'views', 'Chat'));
  app.setViewEngine('ejs');

  await app.listen(3000);
}
bootstrap();
