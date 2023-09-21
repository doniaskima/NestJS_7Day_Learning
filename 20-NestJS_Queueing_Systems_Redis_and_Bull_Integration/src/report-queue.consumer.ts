import {
  OnQueueActive,
  OnQueueCompleted,
  Process,
  Processor,
} from '@nestjs/bull'; // Importing necessary decorators and classes from '@nestjs/bull'

import { Job } from 'bull'; // Importing the Job class from the 'bull' package

@Processor('REPORT_QUEUE') // Decorator to define this class as a processor for the 'REPORT_QUEUE'
export class ReportQueueConsumer {
  @Process('GEN_REPORT') // Decorator defining a processor for the 'GEN_REPORT' job
  async generateReport(job: Job<unknown>) {
    console.log('Job is starting with ID ' + job.id);
    // Simulating report generation by waiting for 30 seconds
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 30000);
    });
    console.log('Job is done with ID ' + job.id);
    return { done: true }; // Returning a result after job completion
  }

  @OnQueueActive() // Decorator defining a handler when a job is active in the queue
  onActive(job: Job) {
    console.log(`Processing job ${job.id} of type ${job.name} `);
  }

  @OnQueueCompleted() // Decorator defining a handler when a job is completed in the queue
  onCompleted(job: Job) {
    console.log(`Completed job ${job.id} of type ${job.name}. `);
  }
}
