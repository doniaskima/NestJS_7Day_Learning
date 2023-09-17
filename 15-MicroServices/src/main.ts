import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './modules/app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ApplicationModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3001,  
      },
    },
  );

  await app.listen().then(() => {
    console.log('MicroService is starting.');
  });
}

bootstrap();
