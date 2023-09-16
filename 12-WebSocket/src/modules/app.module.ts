import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { ChatController } from './chat/chat.controller';
import { LoggerMiddleware } from './shared/middlewares/logger.middleware';
import { SimpleMiddleware } from './shared/middlewares/simple.middleware';

@Module({
  imports: [ChatModule],
  controllers: [ChatController],
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(LoggerMiddleware, SimpleMiddleware)
      .forRoutes({ path: 'chat', method: RequestMethod.GET });
  }
}
