import { InjectQueue } from '@nestjs/bull'; // Importing the InjectQueue decorator from '@nestjs/bull'
import { Injectable } from '@nestjs/common'; // Importing the Injectable decorator from '@nestjs/common'
import { Queue } from 'bull'; // Importing the Queue class from the 'bull' package

@Injectable() // Decorator to define this class as an injectable service in NestJS
export class AppService {
  constructor(@InjectQueue('REPORT_QUEUE') private queue: Queue) {
    // Constructor to inject the Bull queue with the name 'REPORT_QUEUE'
  }

  getHello(): string {
    return 'Hello World!'; // Method to return a simple greeting
  }

  async genReport(type: string) {
    return this.queue.add(
      'GEN_REPORT', // Adds a job with the name 'GEN_REPORT' to the Bull queue
      { type }, // Data object associated with the job, containing the 'type'
      {
        priority: 1, // Specifies the priority of the job as 1
      },
    );
  }
}
