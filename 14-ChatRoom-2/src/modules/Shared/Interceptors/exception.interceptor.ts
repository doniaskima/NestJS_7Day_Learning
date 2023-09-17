import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  HttpStatus,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        return throwError(
          new HttpException(
            'Exception interceptor triggered, exception caught',
            HttpStatus.BAD_GATEWAY,
          ),
        );
      }),
    );
  }
}
