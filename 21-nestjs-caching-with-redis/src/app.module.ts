import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';

import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [
    CacheModule.register({
      ttl: 60000,
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
