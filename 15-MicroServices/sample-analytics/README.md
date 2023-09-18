
## sample-analytics Project Explanation:

In this project, you're creating a Nest.js application that acts as an analytics microservice.

# app.controller.ts: 
Defines the main controller for handling HTTP requests and listening for events based on the route. It has routes for handling GET requests and listening to 'user_created' events.


```typescript
import { Controller, Get } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreateUserEvent } from './create-user.event';

@Controller()  // Decorator to define a controller
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()  // Decorator for handling HTTP GET requests at the root route '/'
  getHello(): string {
    return this.appService.getHello();  // Calls a service method to get a "Hello World!" message
  }

  @EventPattern('user_created')  // Event listener for 'user_created' event
  handleUserCreated(data: CreateUserEvent) {
    this.appService.handleUserCreated(data);  // Calls a service method to handle the 'user_created' event
  }

  @MessagePattern({ cmd: 'get_analytics' })  // Message listener for 'get_analytics' command
  getAnalytics() {
    return this.appService.getAnalytics();  // Calls a service method to get analytics data
  }
}


```

# app.service.ts: 
Defines the service containing the business logic. It interacts with the event data and handles the 'user_created' event. It also manages analytics data.


```typescript
import { Injectable } from '@nestjs/common';
import { CreateUserEvent } from './create-user.event';

@Injectable()  // Decorator to indicate that this class can be injected into other components
export class AppService {
  private readonly analytics: any[] = [];  // Array to store analytics data

  getHello(): string {
    return 'Hello World!';  // Returns a "Hello World!" message
  }

  handleUserCreated(data: CreateUserEvent) {
    console.log('handlerUserCreated - ANALYTICS', data);
    this.analytics.push({
      email: data.email,
      timestamp: new Date(),
    });
  }

  getAnalytics() {
    return this.analytics;  // Returns the stored analytics data
  }
}

```

## create-user.event.ts:
 Defines an event class for creating a user.

 ```typescript
export class CreateUserEvent {
  constructor(public readonly email: string) {}
}

```

## app.module.ts: 
Configures the Nest.js application module, registering necessary controllers, services, and microservices.

 ```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],  // No imports for this module
  controllers: [AppController],  // Specifies the controllers used in this module
  providers: [AppService],  // Specifies the providers (services) used in this module
})
export class AppModule {}


```

## main.ts:
Bootstraps the Nest.js application as a microservice using TCP transport and listens on port 3001.

 ```typescript
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: 3001,
    },
  });
  await app.startAllMicroservices();
  await app.listen(3001);  // Listens on port 3001
}
bootstrap();


```
In summary, the sample-analytics microservice handles HTTP requests, listens for 'user_created' events, and provides analytics data based on the 'get_analytics' command. It also stores analytics data for later retrieval, demonstrating a modular and scalable application structure.