import { Controller, Get, Param } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/gen-report/:type')
  async genReport(@Param('type') type: string) {
    return this.appService.genReport(type);
  }
}
