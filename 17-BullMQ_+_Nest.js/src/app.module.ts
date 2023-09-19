import { BullModule } from '@nestjs/bull'; // Import BullModule from the '@nestjs/bull' package
import { Module } from '@nestjs/common'; // Import Module from the '@nestjs/common' package
import { AppController } from './app.controller'; // Import the AppController from './app.controller'
import { AppService } from './app.service'; // Import the AppService from './app.service'

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost', // Redis server host
        port: 6379, // Redis server port
      },
    }),
    BullModule.registerQueue({
      name: 'transcode', // Name of the Bull queue ('transcode')
    }),
  ],
  controllers: [AppController], // Declare the controllers used in this module
  providers: [AppService], // Declare the providers (services) used in this module
})
export class AppModule {} // Export the AppModule class
