import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { GetUserRequest } from './get-user-request.dto';
import { OrderCreatedEvent } from './order-created.event';

@Injectable()
export class AppService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
  ) {}


  getHello(): string {
    return 'Hello World!';
  }


  handleOrderCreated(orderCreatedEvent: any) {
    try {
      const orderData = orderCreatedEvent?.value;  // Extract data from 'value'
  
      if (!orderData || !orderData.orderId || !orderData.userId) {
        console.error('Invalid order created event:', orderCreatedEvent);
        return;
      }
  
      console.log('Received order created event:', orderData);
      // Process the orderData as needed
  
    } catch (error) {
      console.error('Error processing order:', error);
      throw new Error('Error processing order: ' + error.message);
    }
  }
  

}
