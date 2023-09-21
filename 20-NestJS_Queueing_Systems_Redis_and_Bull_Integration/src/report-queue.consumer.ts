import {
  OnQueueActive,
  OnQueueCompleted,
  Process,
  Processor,
} from '@nestjs/bull';

import { Job } from 'bull';

@Processor('REPORT_QUEUE')
export class ReportQueueConsumer {
  @Process('GEN_REPORT')
  async generateReport(job: Job<unknown>) {
    console.log('Job is starting with ID ' + job.id);
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 30000);
    });
    console.log('Job is done with ID ' + job.id);
    return { done: true };
  }

  @OnQueueActive()
  onActive(job: Job) {
    console.log(`Processing job ${job.id} of type ${job.name} `);
  }

  @OnQueueCompleted()
  onCompleted(job: Job) {
    console.log(`Completed job ${job.id} of type ${job.name}. `);
  }
}
