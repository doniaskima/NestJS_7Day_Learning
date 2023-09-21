import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class AppService {
  constructor(@InjectQueue('REPORT_QUEUE') private queue: Queue) {}

  getHello(): string {
    return 'Hello World!';
  }

  async genReport(type: string) {
    return this.queue.add(
      'GEN_REPORT',
      { type },
      {
        priority: 1,
      },
    );
  }
}
