# NestJS Controllers

This README provides an overview of controllers in NestJS, a powerful framework for building scalable and maintainable server-side applications.

## Introduction

NestJS is a framework for building efficient, scalable, and maintainable server-side applications using TypeScript or JavaScript. Controllers are a fundamental part of NestJS, responsible for handling incoming HTTP requests and defining the application's API endpoints.

## Controllers

Controllers in NestJS are responsible for routing incoming HTTP requests to the appropriate handlers (methods) and returning the response to the client. They play a crucial role in separating concerns within your application by defining different endpoints for various functionalities.

### Creating a Controller

To create a new controller, follow these steps:

1. Create a new TypeScript file, e.g., `sample.controller.ts`.
2. Use the `@Controller()` decorator to define the base route for the controller.

   ```typescript
   import { Controller } from '@nestjs/common';

   @Controller('sample')
   export class SampleController {
     // Controller methods will be defined here
   }
   ```

Inside the controller class, define methods to handle different HTTP requests (GET, POST, PUT, DELETE, etc.). Decorate these methods with appropriate HTTP method decorators like @Get(), @Post(), etc.
```typescript
import { Get, Post, Body } from '@nestjs/common';

@Controller('sample')
export class SampleController {
  @Get()
  findAll(): string {
    return 'This route handles GET requests.';
  }

  @Post()
  create(@Body() data: any): string {
    return `This route handles POST requests with data: ${data}`;
  }
}

  ```


### Routing

NestJS automatically maps controller methods to routes based on the decorators used. For example, the @Get() decorator maps a method to handle GET requests on the base route (/sample in this case), and the @Post() decorator maps a method to handle POST requests on the same base route.

Request Handling
Controller methods can accept parameters to access information from incoming requests. For example, you can use the @Param(), @Query(), and @Body() decorators to access route parameters, query parameters, and request bodies, respectively.

```typescript
@Get(':id')
findOne(@Param('id') id: string): string {
  return `This route handles GET requests with ID: ${id}`;
}


  ```

### Conclusion

Controllers are a key component in structuring your NestJS application, defining API routes, and handling incoming requests. By creating controllers and using decorators, you can easily organize and maintain your application's endpoints.