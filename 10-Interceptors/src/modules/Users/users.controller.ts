import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  Param,
  HttpStatus,
  Body,
  NotFoundException,
  UseGuards,
  UseInterceptors,
  UseFilters,
} from '@nestjs/common';
import { CreateUserDTO } from './DTO/create-users.dto';
import { ProductsService } from '../products/services/products.service';
import { UserService } from './Services/users.service';
import { HttpExceptionFilter } from '../Shared/ExceptionFilters/http-exception.filter';
import { CustomForbiddenException } from '../Shared/ExceptionFilters/forbidden.exception';
import { ParseIntPipe } from '../Shared/Pipes/parse-int.pipe';
import { ValidationPipe } from '../Shared/Pipes/validation.pipe';
import { RolesGuard } from '../Shared/Guards/roles.guard';
import { Roles } from '../Shared/decorators/roles.decorator';
import { LoggingInterceptor } from '../Shared/Interceptors/logging.interceptor';
import { TransformInterceptor } from '../Shared/Interceptors/transform.interceptor';
import { ExceptionInterceptor } from '../Shared/Interceptors/exception.interceptor';

@Controller('users')
@UseGuards(RolesGuard)
@UseFilters(new HttpExceptionFilter())
export class UsersController {
  constructor(
    private userService: UserService,
    private productsService: ProductsService,
  ) {}

  @Get()
  @Roles('admin')
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
  @Roles('general')
  async getUser(@Res() res, @Param('id', new ParseIntPipe()) id) {
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

  @Post('users')
  @Roles('admin')
  async addUser(
    @Res() res,
    @Body(new ValidationPipe()) createUserDTO: CreateUserDTO,
  ) {
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
  async getException(@Req() req, @Res() res) {
    throw new CustomForbiddenException();
  }

  @Get('testInterceptor')
  @UseInterceptors(LoggingInterceptor)
  async testInterceptor(@Req() req, @Res() res) {
    res.status(HttpStatus.OK).json();
  }

  @Get('testTransformInterceptor')
  @UseInterceptors(TransformInterceptor)
  async testTransformInterceptor() {
    return 'test response';
  }

  @Get('testExceptionInterceptor')
  @UseInterceptors(ExceptionInterceptor)
  @UseFilters(new HttpExceptionFilter())
  async testExceptionInterceptor(@Req() req, @Res() res) {
    throw new Error('test ExceptionInterceptor');
  }
}
