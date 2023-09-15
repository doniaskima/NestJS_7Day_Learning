import { Module } from '@nestjs/common';
import { UsersController } from './Users/users.controller';
import { UsersService } from './Users/Services/users.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {}
