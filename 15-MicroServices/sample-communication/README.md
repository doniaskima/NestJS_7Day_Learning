
## sample-communication Project Explanation:

In this project, you're creating a Nest.js application that acts as a communication microservice.

# app.controller.ts: 
Defines the main controller for handling HTTP requests and listening for events based on the route. It has a route for handling GET requests.


```typescript
import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
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
}


```

# app.service.ts: 
Defines the service containing the business logic. It interacts with the event data and handles the 'user_created' event.

```typescript
import { Injectable } from '@nestjs/common';
import { CreateUserEvent } from './create-user.event';

@Injectable()  // Decorator to indicate that this class can be injected into other components
export class AppService {
  getHello(): string {
    return 'Hello World!';  // Returns a "Hello World!" message
  }

  handleUserCreated(data: CreateUserEvent) {
    console.log('handlerUserCreated - COMMUNICATIONS', data);
    // TODO: Implement email functionality to notify the user...
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
Bootstraps the Nest.js application as a microservice using TCP transport.

 ```typescript
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
    },
  );
  app.listen();
}
bootstrap();

```

In summary, the sample-communication microservice handles HTTP requests and listens for the 'user_created' event to perform actions based on the event data. This separation of concerns allows for a scalable and modular application structure.