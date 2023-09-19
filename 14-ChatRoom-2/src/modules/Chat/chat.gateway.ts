import { UseGuards } from '@nestjs/common';
import {
  NestGateway,
  SubscribeMessage,
  WebSocketGateway
} from '@nestjs/websockets';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import { Socket } from 'socket.io'; // Update: import Socket from 'socket.io'
import { WebSocketRolesGuard } from '../Shared/Guards/webSocket.roles.guard';
import { Roles } from '../Shared/decorators/roles.decorator';

@WebSocketGateway({ port: 81, namespace: 'messages' })
@UseGuards(WebSocketRolesGuard)
export class ChatGateway implements NestGateway {
  // Using Socket.IO API
  socket: Socket;

  constructor() {}

  afterInit(server) {}

  handleConnection(socket) {}

  handleDisconnect(socket) {}

  // Add a message
  @SubscribeMessage('pushMessage')
  @Roles('general')
  AddMessage(sender, message: object) {
    // Push the message to the sender's frontend view.
    sender.emit('newMessage', message);
    // Push the message to other established frontend views.
    sender.broadcast.emit('newMessage', message);
  }
}
