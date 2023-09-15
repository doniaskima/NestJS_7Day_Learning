import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const message = 'Your custom message here';
    console.log(`${message}`);
    console.log('Executing middleware...');
    next();
  }
}
