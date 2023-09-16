import {
    WebSocketGateway,
    SubscribeMessage,
    WebSocketServer,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
  } from '@nestjs/websockets';
  import { Logger } from '@nestjs/common';
  
  @WebSocketGateway(81)
  export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server;
  
    private logger: Logger = new Logger('ChatGateway');
  
    afterInit(server) {
      this.logger.log('Initialized');
    }
  
    handleConnection(client) {
      this.logger.log(`Client connected: ${client.id}`);
    }
  
    handleDisconnect(client) {
      this.logger.log(`Client disconnected: ${client.id}`);
    }
  
    @SubscribeMessage('wannaChat')
    onEvent(client, message): any {
      const event = 'wannaChat';
      const response = `Hi, I'm Chat Server.`;
      return { event, data: response };
    }
  }
  