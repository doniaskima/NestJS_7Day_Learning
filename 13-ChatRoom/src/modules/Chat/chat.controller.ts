import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class ChatController {
  @Get('chat')
  @Render('chat')
  chat() {
    return { title: 'Chat Room' };
  }
}
