import { Controller, Get, Param } from '@nestjs/common'; // Importing necessary decorators and modules from NestJS

import { AppService } from './app.service'; // Importing the AppService class from the app.service file

@Controller() // Decorator defining this class as a NestJS controller
export class AppController {
  constructor(private readonly appService: AppService) {} // Constructor to inject the AppService dependency

  @Get() // Decorator defining a GET request handler for the root route ('/')
  getHello(): string {
    return this.appService.getHello(); // Calls the getHello method of AppService and returns the result
  }

  @Get('/gen-report/:type') // Decorator defining a GET request handler for the '/gen-report/:type' route
  async genReport(@Param('type') type: string) {
    return this.appService.genReport(type); // Calls the genReport method of AppService with the specified 'type' parameter and returns the result
  }
}
