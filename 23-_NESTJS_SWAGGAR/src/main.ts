import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Swagger Documentation - Synapse Factory')
    .setDescription(
      'Swagger (aka OpenApi) is a well-known library in the backend universe, available for various languages and frameworks. It generates an internal website in your backend that describes, in great detail, each endpoint and entity structure present in your application.',
    )
    .setVersion('1.0')
    .addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
