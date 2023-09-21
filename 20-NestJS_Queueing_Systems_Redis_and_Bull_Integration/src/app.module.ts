import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ReportQueueConsumer } from './report-queue.consumer';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'REPORT_QUEUE',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ReportQueueConsumer],
})
export class AppModule {}
