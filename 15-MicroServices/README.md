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


```typescript
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
    },
  );
  await app.listen();
}
bootstrap();

```
The createMicroservice() method accepts two arguments:

AppModule: The root module of the Nest application.
options: An object with transporter-specific options like transport, host, port, retryAttempts, and retryDelay.

## Patterns

Microservices recognize both messages and events by patterns. Patterns are automatically serialized and sent over the network along with the data portion of a message. Nest provides support for both request-response and event-based message patterns.

Request-Response

The request-response message style is useful when you need to exchange messages between various external services. Nest creates two logical channels for this: one for transferring the data and the other for incoming responses.

To create a message handler based on the request-response paradigm, use the @MessagePattern() decorator:


```typescript
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class MathController {
  @MessagePattern({ cmd: 'sum' })
  accumulate(data: number[]): number {
    return (data || []).reduce((a, b) => a + b);
  }
}


```


## Asynchronous Responses

Message handlers can respond either synchronously or asynchronously. Async methods and returning Observables are supported.

```typescript
@MessagePattern({ cmd: 'sum' })
async accumulate(data: number[]): Promise<number> {
  return (data || []).reduce((a, b) => a + b);
}

```
## Event-Based

The event-based message style is suitable when you want to publish events without waiting for a response. To create an event handler, use the @EventPattern() decorator:

```typescript
@EventPattern('user_created')
async handleUserCreated(data: Record<string, unknown>) {
  // business logic
}


```

## Client

A client Nest application can exchange messages or publish events to a Nest microservice using the ClientProxy class.

```typescript
import { Client, ClientProxy, Transport } from '@nestjs/microservices';

@Client({ transport: Transport.TCP })
client: ClientProxy;
```

The ClientProxy exposes methods like send() and emit() to communicate with a remote microservice.

## Explore Your Graph with NestJS Devtools

NestJS Devtools provide functionalities like graph visualization, routes navigation, interactive playground, and CI/CD integration. Explore more at NestJS Devtools.

## Scopes

In Nest, almost everything is shared across incoming requests. However, in some cases, request-based lifetime of the handler may be desired. Nest supports request-scoped handlers and providers.

## Handling Timeouts

To apply timeouts to your microservice calls, you can use the RxJS timeout operator. If the microservice does not respond within a certain time, an exception is thrown, which can be caught and handled appropriately.

```typescript
this.client
  .send<TResult, TInput>(pattern, data)
  .pipe(timeout(5000));

```
