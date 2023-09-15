import { Injectable, NotFoundException } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { CreateProductDTO } from '../DTO/create-products.dto';

@Injectable()
export class ProductsService {
  // Mock data
  private products = [
    { _id: 1, _name: 'Watch', _price: 1000 },
    { _id: 2, _name: 'Phone', _price: 25000 },
  ];

  // Use Promise to avoid callback style whenever possible.
  async getAllProducts(): Promise<object[]> {
    return this.products;
  }

  async getProduct(id: number): Promise<object> {
    const product = this.products.find((product) => product._id === id);
    if (!product) {
      // NestJS provides APIs for HTTP exceptions, it's recommended to use them.
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  // You can happily use Rx.js in NestJS as well.
  addProduct(product: CreateProductDTO): Observable<object[]> {
    this.products.push(product);
    return of(this.products);
  }
}
