import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { Controller, Get, UseInterceptors } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello() {
    return this.appService.getHello();
  }
}
