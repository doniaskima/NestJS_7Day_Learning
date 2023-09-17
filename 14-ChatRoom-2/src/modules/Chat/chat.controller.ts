import {
  Controller,
  Get,
  Post,
  Request,
  Response,
  Next,
  UseGuards,
} from '@nestjs/common';
import { RolesGuard } from '../Shared/Guards/roles.guard';
import { Roles } from '../Shared/decorators/roles.decorator';

@Controller()
@UseGuards(RolesGuard)
export class ChatController {
  constructor() {}

  @Get('toAddInChatRoom')
  // Using Express parameters
  async toAddInChatRoom(@Request() req, @Response() res, @Next() next) {
    // Same as in the express project, specify the view path and render variables directly to the view
    res.render('./Chat/toAddInChatRoom', { title: 'Join Chat Room' });
  }

  @Post('addToChatRoom')
  // Using Express parameters
  async addToChatRoom(@Request() req, @Response() res, @Next() next) {
    /*
        1. Below is to establish route guard mechanism, deliberately giving each user with an inputted name a role.
        And in order to display the username in the chat room, store the inputted name through a cookie here.
        This is just for demo purposes, actual storage of names needs to consider more cybersecurity issues.
        2. We store the account and role in the session, and in the Guard mechanism, we will compare the role.
         */
    const tmpAccount: string = req.body.Account;
    req.session.user = {};
    req.session.user.account = tmpAccount;
    if (tmpAccount) {
      // Give the role "general"
      req.session.user.roles = ['general'];
      // Store the name in the frontend cookie. When pushing messages, the frontend will fetch the name and add it to the message before pushing.
      res.cookie('name', `${tmpAccount}`);
    }
    // Same as in the express project, specify the view path and render variables directly to the view
    res.redirect('/chatRoom');
  }

  @Get('chatRoom')
  @Roles('general')
  // Using Express parameters
  async chatRoom(@Request() req, @Response() res, @Next() next) {
    // Same as in the express project, specify the view path and render variables directly to the view
    res.render('./Chat/chatRoom', { title: 'Chat Room' });
  }
}
