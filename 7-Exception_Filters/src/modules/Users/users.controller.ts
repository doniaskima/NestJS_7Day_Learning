import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  Param,
  HttpStatus,
  Body,
  UseFilters,
  Next,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDTO } from './DTO/create-users.dto';
import { ProductsService } from '../products/services/products.service';
import { UserService } from './Services/users.service';
import { HttpExceptionFilter } from '../Shared/ExceptionFilters/http-exception.filter';
import { CustomForbiddenException } from '../Shared/ExceptionFilters/forbidden.exception';

@Controller('users')
@UseFilters(new HttpExceptionFilter())
export class UsersController {
  // Dependency injection, recommended for low coupling
  // Inject UsersService and ProductsService
  constructor(
    private userService: UserService,
    private productsService: ProductsService,
  ) {}

  @Get()
  // Using Express request and response objects
  async getAllUsers(@Req() req, @Res() res) {
    try {
      const users = await this.userService.getAllUsers();
      res.status(HttpStatus.OK).json(users);
    } catch (error) {
      console.error(error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async getUser(@Res() res, @Param('id') id) {
    try {
      const user = await this.userService.getUser(+id); // Convert 'id' to a number
      if (!user) {
        throw new NotFoundException('User not found');
      }
      res.status(HttpStatus.OK).json(user);
    } catch (error) {
      console.error(error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  

  @Post()
  async addUser(@Res() res, @Body() createUserDTO: CreateUserDTO) {
    try {
      const users = await this.userService.addUser(createUserDTO);
      res.status(HttpStatus.OK).json(users);
    } catch (error) {
      console.error(error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Test if ProductsService can be used correctly
  @Get('testProducts')
  // Using Express request and response objects
  async testGetAllProducts(@Req() req, @Res() res) {
    try {
      const products = await this.productsService.getAllProducts();
      res.status(HttpStatus.OK).json(products);
    } catch (error) {
      console.error(error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('getException')
  async getException(@Req() req, @Res() res, @Next() next) {
    throw new CustomForbiddenException();
  }
}
