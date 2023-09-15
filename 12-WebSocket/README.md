# NestJS WebSockets and Gateways

This repository showcases the integration of WebSocket functionality in a NestJS application through the use of Gateways.

## Introduction

Gateways in NestJS are classes annotated with `@WebSocketGateway()` decorator. They provide a platform-agnostic way of handling WebSocket connections and interactions. NestJS supports multiple WebSocket platforms, such as socket.io and ws.

## Installation

To start building WebSockets-based applications, first install the required packages:

```bash
$ npm install --save @nestjs/websockets @nestjs/platform-socket.io
```

## Getting Started

Creating a WebSocket Gateway
Create a WebSocket Gateway by using the @WebSocketGateway() decorator. This class will handle WebSocket events and interactions.


```typescript
import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, WsResponse } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class EventsGateway {
  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: string, @ConnectedSocket() client: Socket): string {
    return data;
  }
}

```

Registering the Gateway
Register the WebSocket Gateway in a module by adding it to the providers array.

```typescript
// events.module.ts

import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';

@Module({
  providers: [EventsGateway],
})
export class EventsModule {}

```

## Consuming WebSocket Events

To consume WebSocket events, you can use the @WebSocketServer() decorator to access the native server instance. You can then emit events to connected clients.

```typescript
import { WebSocketGateway, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  handleEvent(client: Socket, data: string): void {
    this.server.emit('events', data); // Emit the event to all connected clients
  }
}

```

## Broadcasting to Specific Clients

You can also broadcast events to specific clients using their socket IDs.

```typescript
import { WebSocketGateway, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  handleEvent(client: Socket, data: string): void {
    const socketId = client.id;
    this.server.to(socketId).emit('events', data); // Emit the event to a specific client
  }
}

```

## Error Handling

Handle errors that occur during WebSocket interactions within the gateway.


```typescript
import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class EventsGateway {
  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: string, @ConnectedSocket() client: Socket): void {
    if (data === 'error') {
      throw new WsException('Invalid event data');
    }
    return data;
  }
}


```

## Contributing

Feel free to contribute to enhance this documentation. If you have suggestions, improvements, or find errors, please submit a pull request.