// chat.gateway.ts

import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
  } from '@nestjs/websockets';
  
  @WebSocketGateway(81)
  export class ChatGateway {
    @WebSocketServer() server;
  
    handleConnection(client) {
      console.log('Client connected:', client.id);
      // Emit the 'wannaChat' event to the connected client
      client.emit('wannaChat', { message: 'Hello from server!' });
    }
  
    @SubscribeMessage('wannaChat')
    handleWannaChat(client, message) {
      console.log('Received message:', message);
    }
  }
  