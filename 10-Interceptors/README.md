# Interceptors in NestJS

## Introduction

Interceptors in NestJS are classes annotated with the `@Injectable()` decorator and implement the `NestInterceptor` interface.

Interceptors provide a powerful set of capabilities inspired by the Aspect-Oriented Programming (AOP) technique. They allow you to:

- Bind extra logic before or after method execution.
- Transform the result returned from a function.
- Transform exceptions thrown from a function.
- Extend the basic function behavior.
- Completely override a function based on specific conditions (e.g., for caching purposes).

## Basics

Each interceptor implements the `intercept()` method, which takes two arguments: `ExecutionContext` and `CallHandler`. The `ExecutionContext` contains information about the current execution process, and the `CallHandler` is used to invoke the route handler method.

### Execution Context

The `ExecutionContext` inherits from `ArgumentsHost`, providing additional helper methods and details about the current execution process. This can be helpful in building generic interceptors that work across various controllers, methods, and execution contexts.

### Call Handler

The `CallHandler` interface has a `handle()` method that invokes the route handler method. If you don't call this method in your interceptor, the route handler won't be executed.

## Purpose

Interceptors serve several purposes:

1. **Authorization**: Implement logic before or after method execution for authorization purposes.

2. **Response Transformation**: Modify the response returned from a route handler.

3. **Exception Handling**: Override exceptions thrown from a function.

4. **Aspect Interception**: Completely override a function based on conditions, similar to Pointcuts in AOP.

## Example

Here's a simple example of an interceptor logging user interaction:

```typescript
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    const now = Date.now();
    return next.handle().pipe(
      tap(() => console.log(`After... ${Date.now() - now}ms`)),
    );
  }
}
```


To apply this interceptor to a controller, use @UseInterceptors():


```typescript
import { Controller, UseInterceptors } from '@nestjs/common';
import { LoggingInterceptor } from './logging.interceptor';

@Controller('example')
@UseInterceptors(LoggingInterceptor)
export class ExampleController {
  // Controller methods
}

```

### Contributing

Feel free to contribute to enhance this documentation. If you have suggestions, improvements, or find errors, please submit a pull request.