# Middlewares in NestJS

## Introduction

Middleware in NestJS plays a vital role in the request processing pipeline. Middleware functions have access to the request and response objects, allowing developers to intercept requests and responses during the application's runtime.

## Purpose

The primary purposes of middleware in NestJS are as follows:

1. **Request/Response Processing**: Middlewares can modify the request and response objects, such as adding headers, logging, authentication, etc., before and after the main route handler processes the request.

2. **Error Handling**: Middleware can intercept and handle errors that occur during the request-response cycle.

## How to Use

To use middleware in your NestJS application:

1. **Create Middleware**: Create a middleware function that intercepts requests and processes them accordingly.

2. **Register Middleware**: Register the middleware using NestJS decorators, specifying the scope and order of execution.

3. **Apply Middleware**: Apply the middleware to the desired routes or controllers to intercept requests.

## Example

Below is a simple example of creating and using middleware in NestJS:

```typescript
// logger.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    next();
  }
}
```

In your module:

```typescript
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from './logger.middleware';

@Module({})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('/*');
  }
}

```

## Contributing

Feel free to contribute to enhance this documentation. If you have suggestions, improvements, or find errors, please submit a pull request.