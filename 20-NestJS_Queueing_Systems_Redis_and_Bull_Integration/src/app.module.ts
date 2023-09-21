import { AppController } from './app.controller'; // Importing the AppController class from app.controller.ts
import { AppService } from './app.service'; // Importing the AppService class from app.service.ts
import { BullModule } from '@nestjs/bull'; // Importing the BullModule from the '@nestjs/bull' package
import { Module } from '@nestjs/common'; // Importing the Module decorator from '@nestjs/common'
import { ReportQueueConsumer } from './report-queue.consumer'; // Importing the ReportQueueConsumer class from report-queue.consumer.ts

@Module({
  imports: [
    // Configuring BullModule for Redis usage
    BullModule.forRoot({
      redis: {
        host: 'localhost', // Redis host configuration
        port: 6379, // Redis port configuration
      },
    }),
    // Registering a Bull queue named 'REPORT_QUEUE'
    BullModule.registerQueue({
      name: 'REPORT_QUEUE',
    }),
  ],
  controllers: [AppController], // Specifying the controller classes for this module
  providers: [AppService, ReportQueueConsumer], // Specifying the provider classes for this module
})
export class AppModule {} // Exporting the AppModule class as a module for NestJS
