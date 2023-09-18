# Kafka Integration Project with NestJS

## Project Overview
This project is a basic demonstration of integrating NestJS with Apache Kafka to understand how to use Kafka for event-driven communication in a NestJS application.

## Code Explanation and Structure

### 1. `AppController` (app.controller.ts)
This file defines a NestJS controller that handles HTTP requests.


```typescript
// Import necessary modules from NestJS
import { Body, Controller, Get, Post } from '@nestjs/common';

// Import the AppService and CreateOrderRequest DTO
import { AppService } from './app.service';
import { CreateOrderRequest } from './create-order-request.dto';

@Controller()  // Decorator to define a controller
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()  // Decorator for handling HTTP GET requests at the root route '/'
  getHello(): string {
    return this.appService.getHello();  // Calls a service method to get a "Hello World!" message
  }

  @Post()  // Decorator for handling HTTP POST requests at the root route '/'
  createOrder(@Body() createOrderRequest: CreateOrderRequest) {
    this.appService.createOrder(createOrderRequest);  // Calls a service method to create an order
  }
}


```

### 2. `AppService` (app.service.ts)
The service file encapsulates the business logic of the application.

```typescript
// Import necessary modules from NestJS
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

// Import DTO and Event classes
import { CreateOrderRequest } from './create-order-request.dto';
import { OrderCreatedEvent } from './order-created.event';

@Injectable()  // Decorator to indicate that this class can be injected into other components
export class AppService {
  constructor(
    @Inject('BILLING_SERVICE') private readonly billingClient: ClientKafka,  // Injecting the Kafka client
  ) {}

  getHello(): string {
    return 'Hello World!';  // Returns a "Hello World!" message
  }

  createOrder({ userId, price }: CreateOrderRequest) {
    // Emits an 'order_created' event to the billingClient with order details
    this.billingClient.emit(
      'order_created',
      new OrderCreatedEvent('123', userId, price),
    );
  }
}



```

### 3. `CreateOrderRequest` (create-order-request.dto.ts)
This DTO defines the structure of a request to create an order.

```typescript
export class CreateOrderRequest {
  userId: string;
  price: number;
}

```

### 4. `AppModule` (app.module.ts)
This module configures the NestJS application and integrates Kafka using the NestJS Kafka package.


```typescript
// Import necessary modules from NestJS
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

// Import controllers and services
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({  // Decorator to define a module
  imports: [
    ClientsModule.register([  // Registering microservices clients
      {
        name: 'BILLING_SERVICE',  // Name of the microservice client
        transport: Transport.KAFKA,  // Transport protocol used (Kafka)
        options: {
          client: {
            clientId: 'billing',  // Client ID for Kafka
            brokers: ['localhost:9092'],  // Kafka brokers
          },
          consumer: {
            groupId: 'billing-consumer',  // Consumer group ID for Kafka
          },
        },
      },
    ]),
  ],
  controllers: [AppController],  // Specifies the controllers used in this module
  providers: [AppService],  // Specifies the providers (services) used in this module
})
export class AppModule {}  // Exporting the AppModule class



```

### 5. Kafka Configuration in `AppModule`
- Imports necessary modules (`ClientsModule`, `Transport`) from NestJS and configures a Kafka client named 'BILLING_SERVICE'.
- Configures the Kafka client with broker details (`localhost:9092`), client ID (`billing`), and consumer group ID (`billing-consumer`).


 
### 6. Kafka Producer in `AppService`
- The `createOrder` method in `AppService` acts as a Kafka producer, sending order creation events to the Kafka topic.

### 7. `OrderCreatedEvent` (order-created.event.ts)
Defines an event class for order creation, which includes order ID, user ID, and price.

### 8. Bootstrap and Start the Application
- The `bootstrap` function in `main.ts` creates the NestJS application and starts listening on port 3000.

## How to Run the Project
1. Install dependencies: `npm install`
2. Start the application: `npm start`

Now, you can make HTTP requests to create an order and observe the events being produced to the Kafka topic.

 
