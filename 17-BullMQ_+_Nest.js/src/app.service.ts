import { InjectQueue } from '@nestjs/bull'; // Import InjectQueue from the '@nestjs/bull' package
import { Injectable } from '@nestjs/common'; // Import Injectable from the '@nestjs/common' package
import { Queue } from 'bull'; // Import Queue from the 'bull' package
import { TRANSCODE_QUEUE } from './constants'; // Import the TRANSCODE_QUEUE constant from './constants'

@Injectable()
export class AppService {
  constructor(
    @InjectQueue(TRANSCODE_QUEUE) private readonly transcodeQueue: Queue, // Inject the transcode queue using TRANSCODE_QUEUE token
  ) {}

  getHello(): string {
    return 'Hello World!'; // Return a simple "Hello World!" message
  }

  async transcode() {
    await this.transcodeQueue.add({
      fileName: './file.mp3', // Add a transcode job to the queue with a file name
    });
  }
}
