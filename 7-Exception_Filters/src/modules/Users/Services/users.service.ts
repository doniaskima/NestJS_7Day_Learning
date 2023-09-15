import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDTO } from '../DTO/create-users.dto';

@Injectable()
export class UserService {
  private users = [
    { _id: 1, _name: 'Donia', _age: 21 },
    { _id: 2, _name: 'Dorra', _age: 20 },
  ];

  // Use Promise to avoid callback-style code
  async getAllUsers() {
    return Promise.resolve(this.users);
  }

  async getUser(id: number) {
    const user = this.users.find((user) => user._id === id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return Promise.resolve(user);
  }

  async addUser(user: CreateUserDTO): Promise<object[]> {
    this.users.push(user);
    return Promise.resolve(this.users);
  }
}
