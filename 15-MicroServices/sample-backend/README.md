# NestJS Microservices Example

This readme provides an overview and example of implementing microservices in NestJS using the `@nestjs/microservices` package.

## Overview

In addition to traditional monolithic application architectures, Nest natively supports the microservice architectural style of development. This section covers the aspects of Nest that are specific to microservices.

In Nest, a microservice is fundamentally an application that uses a different transport layer than HTTP.

Nest supports several built-in transport layer implementations, called transporters, which are responsible for transmitting messages between different microservice instances. These transporters natively support both request-response and event-based message styles.

## Installation

To start building microservices, first install the required package:

```bash
$ npm i --save @nestjs/microservices
```

## Getting Started

To instantiate a microservice, use the createMicroservice() method of the NestFactory class:

## sample-backend Project Explanation:

In this project, you're creating a Nest.js application that acts as a backend service.

# app.controller.ts: 
Defines the main controller for handling HTTP requests and calling the appropriate service methods based on the route. It has routes for handling GET (root and /analytics) and POST requests.



```typescript
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserRequest } from './create-user-request.dto';

@Controller()  // Decorator to define a controller
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()  // Decorator for handling HTTP GET requests at the root route '/'
  getHello(): string {
    return this.appService.getHello();  // Calls a service method to get a "Hello World!" message
  }

  @Post()  // Decorator for handling HTTP POST requests at the root route '/'
  createUser(@Body() createUserRequest: CreateUserRequest) {
    this.appService.createUser(createUserRequest);  // Calls a service method to create a user
  }

  @Get('analytics')  // Decorator for handling HTTP GET requests at the route '/analytics'
  getAnalytics() {
    return this.appService.getAnalytics();  // Calls a service method to get analytics data
  }
}

```

# app.service.ts: 
Defines the service containing the business logic. It interacts with clients using Nest.js' ClientProxy from @nestjs/microservices. It handles creating a user and interacting with other microservices.

```typescript
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserRequest } from './create-user-request.dto';
import { CreateUserEvent } from './create-user.event';

@Injectable()  // Decorator to indicate that this class can be injected into other components
export class AppService {
  private readonly users: any[] = [];  // Array to store user data

  constructor(
    @Inject('COMMUNICATION') private readonly communicationClient: ClientProxy,  // Injecting communicationClient
    @Inject('ANALYTICS') private readonly analyticsClient: ClientProxy,  // Injecting analyticsClient
  ) {}

  getHello(): string {
    return 'Hello World!';  // Returns a "Hello World!" message
  }

  createUser(createUserRequest: CreateUserRequest) {
    // Adds the user data to the users array
    this.users.push(createUserRequest);

    // Emits a 'user_created' event to the communicationClient and analyticsClient
    this.communicationClient.emit(
      'user_created',
      new CreateUserEvent(createUserRequest.email),
    );
    this.analyticsClient.emit(
      'user_created',
      new CreateUserEvent(createUserRequest.email),
    );
  }

  getAnalytics() {
    // Sends a message to the analyticsClient to get analytics data
    return this.analyticsClient.send({ cmd: 'get_analytics' }, {});
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
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // Registers the microservices clients
    ClientsModule.register([
      {
        name: 'COMMUNICATION',  // Name of the communication microservice client
        transport: Transport.TCP,  // Transport protocol used (TCP)
      },
      {
        name: 'ANALYTICS',  // Name of the analytics microservice client
        transport: Transport.TCP,  // Transport protocol used (TCP)
        options: { port: 3001 },  // Additional options (port) for analytics microservice
      },
    ]),
  ],
  controllers: [AppController],  // Specifies the controllers used in this module
  providers: [AppService],  // Specifies the providers (services) used in this module
})
export class AppModule {}

```