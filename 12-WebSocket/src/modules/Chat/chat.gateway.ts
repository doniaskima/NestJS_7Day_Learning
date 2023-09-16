import {
    WebSocketGateway,
    SubscribeMessage,
    WebSocketServer,
    WsResponse,
    WsException,
  } from '@nestjs/websockets';

  
  // WebSocket listens on port 81
  @WebSocketGateway(81)
  
  export class ChatGateway {
    @WebSocketServer() server;
    constructor() {
        console.log('WebSocketGateway initialized');
      }
    // Subscribe to event named 'wannaChat'
    @SubscribeMessage('wannaChat')
    onEvent(client, message): WsResponse<string> {
      // Event to listen to
      const event = 'wannaChat';
      // Receive the message from the client
      console.log(message);
      // Prepare a response message for the client
      const response = `Hi, I'm Chat Server.`;
      /* Structure of WsResponse interface
      export interface WsResponse<T> {
        event: string;
        data: T;
      }
      */
      // Push the message to the specified event, where the data is the message we want to push
      // This approach is similar to sending a response after an HTTP POST request
      return { event, data: response };
    }
  }
  