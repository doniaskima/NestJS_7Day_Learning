import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './shared/middlewares/logger.middleware';
import { SimpleMiddleware } from './shared/middlewares/simple.middleware';
import { ChatModule } from './Chat/chat.module';

@Module({
  imports: [UsersModule,ChatModule],
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    // Use the .apply() method to attach middleware to specific routes and methods
    consumer.apply(LoggerMiddleware, SimpleMiddleware).forRoutes(
      // Define the routes for which middleware should be applied
      { path: 'users', method: RequestMethod.ALL }, // Apply middleware to all methods for '/users' route
      { path: 'products', method: RequestMethod.ALL }, // Apply middleware to all methods for '/products' route
    );
  }
}
