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
        if(error.status === 0) { // client-side or network error
          errorMessage = this.getClientNetworkErrorMessage(error);
        } else { // server-side error
          errorMessage = this.getServerErrorMessage(error);
        }
        return throwError(errorMessage);
      })
    );
  }

  private getClientNetworkErrorMessage(error: HttpErrorResponse): string {
    if (!navigator.onLine) {
      return 'No internet connection';
    }
    return error.error.message;
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 404:
        return `Not found: ${error.message}`;
      default:
        return `Error status: ${error.status}, error message: ${error.message}`;
    }
  }
}
