import { Inject, Injectable } from '@nestjs/common';

import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
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
