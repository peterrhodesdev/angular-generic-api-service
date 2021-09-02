import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, pipe, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage: string;
        if(error.error instanceof ErrorEvent) { // client-side error
          errorMessage = error.error.message;
        } else { // server-side error
          errorMessage = this.getServerErrorMessage(error);
        }
        return throwError(errorMessage);
      })
    );
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 404:
        return 'Not found';
      default:
        return `Error status: ${error.status}, error message: ${error.message}`;
    }
  }
}
