import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';

import { AppService } from './app.service';
import { ClientGrpc } from '@nestjs/microservices';

@Controller()
export class AppController implements OnModuleInit {
  private usersService;
  constructor(
    private readonly appService: AppService,
    @Inject('USERS_SERVICE') private client: ClientGrpc,
  ) {}
  onModuleInit() {
    this.usersService = this.client.getService('UsersService');
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('users')
  async getUsers() {
    return this.usersService.GetUser({ email: 'Jon@gmail.com' });
  }
}
