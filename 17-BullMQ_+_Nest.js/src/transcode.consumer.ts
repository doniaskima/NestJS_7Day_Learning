import { Process, Processor } from '@nestjs/bull'; // Import necessary decorators from '@nestjs/bull'
import { Logger } from '@nestjs/common'; // Import Logger from '@nestjs/common'
import { Job } from 'bull'; // Import Job from 'bull'
import { TRANSCODE_QUEUE } from './constants'; // Import the TRANSCODE_QUEUE constant from './constants'

@Processor(TRANSCODE_QUEUE) // Decorate the class as a processor for the TRANSCODE_QUEUE
export class TranscodeConsumer {
  private readonly logger = new Logger(TranscodeConsumer.name);

  @Process() // Decorate a method to process jobs from the queue
  async transcode(job: Job<unknown>) {
    // Handler for processing jobs from the queue
    this.logger.log(`Transcoding message: ${job.id}`);
    this.logger.debug('Data:', job.data); // Log job data
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 8000)); // Simulate a transcoding process
    this.logger.log(`Transcoding complete for job: ${job.id}`);
  }
}
