import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomForbiddenException extends HttpException {
  constructor() {
    // Call the super constructor with a custom message and the HTTP status code FORBIDDEN (403).
    super('Access Forbidden', HttpStatus.FORBIDDEN);
  }
}
