import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  Param,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { CreateProductDTO } from './DTO/create-products.dto';
import { ProductsService } from './services/products.service';

@Controller('products')
export class ProductsController {
  // Dependency injection, recommended for low coupling
  constructor(private productsService: ProductsService) {}

  @Get()
  // Using Express request and response objects
  async getAllProducts(@Req() req, @Res() res) {
    try {
      const products = await this.productsService.getAllProducts();
      res.status(HttpStatus.OK).json(products);
    } catch (error) {
      console.error(error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }

  @Get('/:id')
  // Using Express request and response objects
  // @Param('id') can directly retrieve the 'id' parameter
  async getProduct(@Res() res, @Param('id') id) {
    try {
      const product = await this.productsService.getProduct(+id); // Convert 'id' to a number
      res.status(HttpStatus.OK).json(product);
    } catch (error) {
      console.error(error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }

  @Post()
  async addProduct(@Res() res, @Body() createProductDTO: CreateProductDTO) {
    try {
      const products = await this.productsService.addProduct(createProductDTO);
      res.status(HttpStatus.OK).json(products);
    } catch (error) {
      console.error(error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
