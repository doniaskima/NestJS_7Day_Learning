# NestJS Modules

Modules are a fundamental concept in NestJS, used to organize and structure your application into manageable and reusable pieces. They help you keep your codebase clean, maintainable, and promote a modular architecture.

## What Are Modules?

In NestJS, a module is a TypeScript class decorated with the `@Module()` decorator. Each module encapsulates a related set of components, controllers, services, and other modules, creating a cohesive and isolated unit within your application.

## Creating a Module

To create a module in NestJS, follow these steps:

1. Create a TypeScript class and decorate it with the `@Module()` decorator. This decorator takes an object with various properties, including `imports`, `controllers`, `providers`, and `exports`.

```typescript
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
```

In this example, we've created a UsersModule that includes a UsersController and a UsersService. The @Module() decorator specifies which controllers and providers are associated with this module.

## Using Modules

Modules are used to organize the different parts of your application. Here's how you can use modules:

1-Main Application Module: Your application typically has a root module (often named AppModule) that serves as the entry point. This module imports and combines other modules.


```typescript
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
})
export class AppModule {}

```

Feature Modules: Feature modules are used to encapsulate related functionality. For example, the UsersModule in the previous example encapsulates user-related features.

Shared Modules: You can create shared modules containing components, services, or utilities that can be used across different parts of your application.

## Exporting and Importing Modules

Modules can also export some of their components or services to make them available to other modules. This is useful for creating reusability.


```typescript
@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // Exporting the UsersService
})
export class UsersModule {}

```


In this case, the UsersService from the UsersModule can be imported and used in other modules.

## Summary

NestJS modules are a powerful tool for organizing and structuring your application. They promote a modular and maintainable codebase, making it easier to manage and scale your application as it grows.

For more information on modules and other NestJS concepts, refer to the official NestJS documentation.