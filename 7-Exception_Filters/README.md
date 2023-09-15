# Exception Filters in NestJS

## Introduction

Exception filters in NestJS provide a way to handle exceptions that occur during the request-response cycle. They allow for centralized error handling and customized responses to be sent back to the client in case of errors.

## Purpose

The main purposes of exception filters in NestJS are:

1. **Error Handling**: Exception filters catch and handle errors in a centralized and organized manner.

2. **Customized Responses**: They enable you to tailor the response sent to the client based on the type of exception or error that occurred.

3. **Centralized Logic**: Exception filters provide a centralized location to implement common error-handling logic.

## How to Use

To use exception filters in your NestJS application:

1. **Create an Exception Filter**: Create a custom exception filter by implementing the `ExceptionFilter` interface or by using the `@Catch()` decorator.

2. **Define Exception Logic**: Implement the logic to handle specific types of exceptions within the custom exception filter.

3. **Apply Exception Filter**: Apply the exception filter to the desired controllers or routes to catch and handle exceptions.

## Example

Below is a simple example of creating and using an exception filter in NestJS:

```typescript
// http-exception.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response
      .status(status)
      .json({
        statusCode: status,
        message: exception.message,
      });
  }
}
```
In your controller:

```typescript
import { Controller, Get, UseFilters } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { HttpExceptionFilter } from './http-exception.filter';

@Controller('sample')
export class SampleController {
  @Get('error')
  @UseFilters(new HttpExceptionFilter())
  throwError() {
    throw new HttpException('This is a custom HTTP exception', HttpStatus.FORBIDDEN);
  }
}

```

## Contributing

Feel free to contribute to enhance this documentation. If you have suggestions, improvements, or find errors, please submit a pull request.