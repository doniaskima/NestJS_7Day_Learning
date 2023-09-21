import { Injectable } from '@nestjs/common';

import axios from 'axios';

@Injectable()
export class AppService {
  async getHello() {
    const response = await axios
      .get('https://jsonplaceholder.typicode.com/todos')
      .then((res) => res.data);
    console.log('From API');
    return response;
  }
}
