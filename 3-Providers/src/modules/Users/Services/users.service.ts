import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from '../DTO/create-users.dto';

@Injectable()
export class UsersService {
  // Mock data
  private users = [
    { _id: 1, _name: 'Donia', _age: 21 },
    { _id: 2, _name: 'Sirine', _age: 21 },
  ];

  // Use Promises, avoid using callbacks whenever possible
  async getAllUsers(): Promise<any[]> {
    return this.users;
  }

  async getUser(id: number): Promise<any> {
    const user = this.users.find((user) => user._id === id);
    if (!user) {
      // NestJS provides built-in exceptions, it's recommended to use them
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // You can still use RxJS in NestJS
  async addUser(user: CreateUserDTO): Promise<any[]> {
    const newUser = {
      _id: this.generateUserId(),
      _name: user._name,
      _age: user._age,
    };
    this.users.push(newUser);
    return this.users;
  }

  private generateUserId(): number {
    // Implement a logic to generate a unique user ID
    // You can use a library like `uuid` to generate a unique ID
    // For simplicity, here's a basic example:
    return this.users.length + 1;
  }
}
