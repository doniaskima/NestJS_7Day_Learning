import {
  Controller,
  Get,
  Post,
  Response,
  Param,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { CreateUserDTO } from './DTO/create-users.dto';
import { UsersService } from '../Users/Services/users.service';

@Controller('users')
export class UsersController {
  // Dependency injection is recommended for loose coupling
  constructor(private userService: UsersService) {}

  @Get()
  // Using decorators from NestJS instead of Express parameters
  async getAllUsers(@Response() res) {
    try {
      const users = await this.userService.getAllUsers();
      res.status(HttpStatus.OK).json(users);
    } catch (error) {
      console.error(error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal Server Error' });
    }
  }

  @Get('/:id')
  async getUser(@Response() res, @Param('id') id) {
    try {
      const user = await this.userService.getUser(+id); // Convert id to a number
      res.status(HttpStatus.OK).json(user);
    } catch (error) {
      console.error(error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal Server Error' });
    }
  }

  @Post()
  async addUser(@Response() res, @Body() createUserDTO: CreateUserDTO) {
    try {
      const users = await this.userService.addUser(createUserDTO);
      res.status(HttpStatus.OK).json(users);
    } catch (error) {
      console.error(error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal Server Error' });
    }
  }
}
