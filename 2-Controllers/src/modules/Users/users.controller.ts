import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  Param,
  Body,
  HttpStatus,
} from '@nestjs/common';
import { CreateUserDTO } from './DTO/create-users.dto';

@Controller('users')
export class UsersController {
  @Get()
  async getAllUsers(@Req() req, @Res() res) {
    // Simulated data
    const users = [{ Name: 'Donia', Age: 21 }];
    // Multiple HttpStatus options are available
    res.status(HttpStatus.OK).json(users);
  }

  @Get('/:id')
  getUser(@Param('id') id: string) {
    return { getUser: id };
  }

  @Post()
  async addUser(@Body() createUserDTO: CreateUserDTO) {
    // Display the request body
    console.log('Name:', createUserDTO._name, 'Age:', createUserDTO._age);
  }
}
