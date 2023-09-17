import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';

@Module({
  // Include ChatController
  controllers: [ChatController],
  // Include ChatGateway
  providers: [ChatGateway],
})
export class ChatModule {}
