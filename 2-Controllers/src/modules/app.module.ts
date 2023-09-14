import { Module } from '@nestjs/common';
import { UsersController } from './Users/users.controller';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [],
})
export class AppModule {}
