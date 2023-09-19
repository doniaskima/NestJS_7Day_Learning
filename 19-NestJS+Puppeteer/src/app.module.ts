import { Module } from '@nestjs/common';
import { AmazonModule } from './amazon/amazon.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AmazonModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
