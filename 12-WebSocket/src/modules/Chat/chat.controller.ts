import { Controller, Get, Req, Res, Next } from '@nestjs/common';
import { Response, Request } from 'express';

@Controller()
export class ChatController {
  constructor() {}

  @Get('chat')
  async chat(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: Function,
  ) {
    // Similar to Express projects, specify the view path, and variables can be rendered directly to the view
    res.render('./Chat/chat', { title: 'Chat Room' });
  }
}
