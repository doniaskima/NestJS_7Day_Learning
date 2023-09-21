# NestJS Caching with Redis - README

This repository demonstrates the implementation of caching in a NestJS application using Redis and `@nestjs/cache-manager`. Caching is a technique used to store frequently accessed data in a cache, reducing the need to fetch it from the original data source repeatedly. `@nestjs/cache-manager` simplifies caching in NestJS applications by providing a convenient interface to work with various caching stores like Redis.

## Benefits of `@nestjs/cache-manager`

- **Simplified Cache Management**: `@nestjs/cache-manager` simplifies caching implementation by providing a clean and easy-to-use API to interact with caching stores.

- **Multi-Store Support**: It allows for the usage of multiple caching stores, including Redis, memory, and more. This flexibility enables choosing the most suitable caching store for specific use cases.

- **Decorator-based Caching**: By utilizing decorators like `@CacheTTL`, `@CacheKey`, and `@UseInterceptors(CacheInterceptor)`, you can easily implement caching at the method level, providing fine-grained control over caching configurations.

- **Efficient Caching Strategies**: With the ability to set time-to-live (TTL) for cached data and cache invalidation strategies, you can optimize your caching approach and ensure data consistency.

## Code Overview

### `AppController` (app.controller.ts)

This controller handles HTTP requests and interacts with the `AppService`.

- **`@Get()`:** This decorator defines a handler for HTTP GET requests to the root endpoint.
- **`getHello()`:** This method is invoked for a GET request and returns the result from the `AppService.getHello()`.

| ![Screenshot 1](Screenshots/redis-6.png) |

### `AppService` (app.service.ts)

This service contains the business logic and interacts with an external API using Axios.

- **`getHello()`:** This method fetches data from an API (JSONPlaceholder) and caches the response for 60 seconds using `@nestjs/cache-manager`.


| ![Screenshot 2](Screenshots/redis-7.png) |

## Setting Up and Running the Application

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd nestjs-caching-with-redis
    ```

## Testing Caching

Access the application at http://localhost:3000.

Multiple requests to the root endpoint (http://localhost:3000) will demonstrate cache hits and misses based on the defined caching strategies.

## Additional Notes
Ensure that a Redis server is running locally or adjust the Redis configuration in src/app.module.ts as needed.
Customize the caching strategies and configurations in AppService and AppModule based on your application requirements.

| ![Screenshot 3](Screenshots/redis-4.png) |


## Testing Caching and Response Time Differences

When testing the application using Postman, you may observe differences in response times due to caching:

First Request after Application Start:

Initial request after starting the application may not benefit from caching as the cache is empty.
Response time will include the time taken to fetch data from the API and populate the cache.
Subsequent Requests within the Cache TTL:

For requests made within the cache's time-to-live (TTL), the response time will be significantly faster.
The application will fetch the data from the cache, resulting in a faster response compared to fetching it from the API.
Requests after Cache TTL Expires:

After the cache TTL expires, the next request will experience a delay similar to the first request.
The application will fetch the data from the API, and the response time will include the API request time.
By observing these scenarios in Postman, you can appreciate how caching optimizes response times, especially for frequently accessed data within the cache TTL.

| ![Screenshot 4](Screenshots/redis-1.png) |
| ![Screenshot 5](Screenshots/redis-2.png) |