# Pipes in NestJS

![Pipe Image](Pipe_1 (1).png)

## Introduction

Pipes in NestJS are a fundamental concept used for input validation, data transformation, and other data processing tasks. They allow you to process the data that flows through your application in a structured and configurable manner.

## Purpose

The main purposes of pipes in NestJS are:

1. **Input Validation**: Pipes help validate the input data to ensure it meets the required criteria.

2. **Data Transformation**: They allow for transforming the input data into the desired format.

3. **Error Handling**: Pipes can be used to throw appropriate exceptions if the input data is invalid.

4. **Code Reusability**: Pipes promote code reusability by encapsulating common data processing tasks.

## How to Use

To use pipes in your NestJS application:

1. **Create a Pipe**: Create a custom pipe by implementing the `PipeTransform` interface or by using the `@Injectable()` decorator.

2. **Define Pipe Logic**: Implement the logic to process and transform the input data within the custom pipe.

3. **Apply Pipe**: Apply the pipe to the desired endpoints (e.g., controllers, methods) using decorators like `@UsePipes()`.

## Example

Below is a simple example of creating and using a pipe for input validation in NestJS:

```typescript
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('Invalid input. Must be an integer.');
    }
    return val;
  }
}
```

In your controller:

```typescript
import { Controller, Get, Param, UsePipes } from '@nestjs/common';
import { ParseIntPipe } from './parse-int.pipe';

@Controller('example')
export class ExampleController {
  @Get(':id')
  @UsePipes(new ParseIntPipe())
  findExample(@Param('id') id: number): string {
    return `Received ID: ${id}`;
  }
}

```

## Contributing

Feel free to contribute to enhance this documentation. If you have suggestions, improvements, or find errors, please submit a pull request.