# Billing Microservice

This project represents a microservice that handles billing functionalities within a larger microservices architecture.

## AppController

The `AppController` defines the HTTP routes and event handlers for this microservice. It interacts with the `AppService` to handle requests and events.

- **HTTP GET**: Retrieves a hello message.
- **Kafka Event ('order_created')**: Handles the event when an order is created.

```typescript
@Controller()
export class AppController implements OnModuleInit {
  constructor(
    private readonly appService: AppService,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('order_created')
  handleOrderCreated(data: any) {
    this.appService.handleOrderCreated(data.value);
  }

  onModuleInit() {
    this.authClient.subscribeToResponseOf('get_user');
  }
}
```

## AppController

The AppService handles business logic, including communicating with the authentication service through Kafka.

Kafka Request ('get_user'): Sends a request to get user information when handling an order creation event.

```typescript
@Injectable()
export class AppService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  handleOrderCreated(orderCreatedEvent: OrderCreatedEvent) {
    // Send a request to get user information based on the event's userId
    this.authClient
      .send('get_user', new GetUserRequest(orderCreatedEvent.userId))
      .subscribe((user) => {
        console.log(
          `Billing user with stripe ID ${user.stripeUserId} a price of $${orderCreatedEvent.price}...`,
        );
      });
  }
}

```

##  AppModule and Bootstrap

The AppModule configures the microservice to connect to Kafka and sets up the required options.*


```typescript
// NestJS and Kafka microservices initialization
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'billing-consumer',
        },
      },
    },
  );
  app.listen();
}
bootstrap();

```

## OrderCreatedEvent

Represents an event when an order is created.

```typescript
export class OrderCreatedEvent {
  constructor(
    public readonly orderId: string,
    public readonly userId: string,
    public readonly price: number,
  ) {}
}


```
The OrderCreatedEvent class encapsulates the order details.

This microservice communicates with the authentication service through Kafka, subscribing to events and handling order creations.