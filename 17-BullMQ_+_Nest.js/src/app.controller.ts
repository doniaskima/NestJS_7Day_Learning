import { Controller, Get, Post } from '@nestjs/common'; // Import necessary decorators from '@nestjs/common'
import { AppService } from './app.service'; // Import the AppService from './app.service'

@Controller() // Decorate the class as a controller
export class AppController {
  constructor(private readonly appService: AppService) {
    // Constructor: Initializes the controller with an instance of AppService
  }

  @Get() // Decorate a method to handle HTTP GET requests
  getHello(): string {
    // Handler for the GET request
    return this.appService.getHello(); // Call the getHello method from AppService
  }

  @Post('transcode') // Decorate a method to handle HTTP POST requests at the '/transcode' route
  async transcode() {
    // Handler for the POST request to '/transcode'
    return this.appService.transcode(); // Call the transcode method from AppService
  }
}
