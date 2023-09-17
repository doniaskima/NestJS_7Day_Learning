import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

// Here you define a class ChatGateway and annotate it with @WebSocketGateway. This decorator configures the class to be a WebSocket gateway.
@WebSocketGateway({ namespace: 'messages' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
// WebSocketServer decorator: @WebSocketServer() is a decorator that injects the WebSocket server instance (Socket.IO server) into the server property of the class.

   @WebSocketServer() server: Server;
 


   //Connection and Disconnection Handlers: These are event handlers for when a client connects (handleConnection) or disconnects (handleDisconnect). They log messages indicating client connections or disconnections.

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }
 
  //Message Handling: This is a message handler decorated with @SubscribeMessage('pushMessage'). It listens for messages with the event 'pushMessage'.
  // When a message is received, it uses this.server.emit to send the message to all connected clients with the event 'newMessage'.

  @SubscribeMessage('pushMessage')
  handleMessage(@MessageBody() message: string): void {
    // Send the message to all connected clients
    this.server.emit('newMessage', message);
 
  }
}
