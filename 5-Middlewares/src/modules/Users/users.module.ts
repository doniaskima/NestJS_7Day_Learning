import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './Services/users.service'; // Correct path to UserService
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [ProductsModule],
  controllers: [UsersController],
  providers: [UserService],
})
export class UsersModule {}
