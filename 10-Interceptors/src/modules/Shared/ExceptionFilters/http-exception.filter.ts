import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';

// Use the @Catch decorator and pass HttpException as the error type to handle.
@Catch(HttpException)
// It is recommended to implement the ExceptionFilter interface.
export class HttpExceptionFilter implements ExceptionFilter {
  // Implement the catch method, which handles the exception.
  catch(exception: HttpException, host: ArgumentsHost) {
    // Get the HTTP status code from the exception.
    const status = exception.getStatus();
    // Define a custom log message.
    const message = 'This is an Exception Log Message';

    // Log the status and message to the console.
    console.log(`Exception status:`, status);
    console.log(`Exception message:`, message);

    // Get the response object from the host.
    const response = host.switchToHttp().getResponse();

    // Adjust the response JSON content.
    response.status(status).json({
      statusCode: status,
      message: message,
    });
  }
}
