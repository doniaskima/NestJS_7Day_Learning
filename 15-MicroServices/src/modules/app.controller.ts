import { Controller, Get } from '@nestjs/common';
import {
  MessagePattern,
  Transport,
  Client,
  ClientProxy,
} from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  @Client({ transport: Transport.TCP })
  client: ClientProxy;

  // Strategy pattern, define a custom strategy name 'sayHi'
  @MessagePattern({ cmd: 'sayHi' })
  // Accepts data as an argument
  sayHi(data: string): Observable<string> {
    return new Observable<string>((observer) => {
      observer.next("Hi, I'm a MicroService.");
      observer.complete();
    });
  }

  @Get()
  call(): Observable<string> {
    // Call using a strategy, selecting 'sayHi'
    const pattern = { cmd: 'sayHi' };
    // Since send() requires two parameters, pattern and data,
    // we provide an empty string as data in this case.
    const data = '';
    return this.client.send<string>(pattern, data);
  }
}
