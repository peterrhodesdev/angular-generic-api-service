import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, pipe, throwError } from 'rxjs';
import { catchError, concatMap, delay, retryWhen } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("in interceptor");
    return next.handle(request).pipe(
      retryWhen((errors: Observable<any>) => this.handleRetries(errors)),
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  /* handle retries */

  private handleRetries(errors: Observable<any>): Observable<any> {
    console.log("in handleRetries");
    let retryAttempts: number = 3;
    let retryStatusCodes: number[] = [404, 408, 500, 503, 504];
    return errors.pipe(
      // Handle the errors in order
      concatMap((error, index) => {
        console.log(`index = ${index}, error.status = ${error.status}`);
        if (index < retryAttempts && retryStatusCodes.includes(error.status)) {
          // Retry with delay
          let delayMillis: number = this.calculateDelayMillis(index);
          console.log("will retry with delay = ", delayMillis);
          return of(error).pipe(delay(delayMillis));
        }
        return throwError(error);
      }),
    );
  }

  private calculateDelayMillis(iteration: number): number {
    let initialInterval: number = 1000;
    return Math.pow(1.5, iteration) * initialInterval;
  }

  /* handle error */

  private handleError(error: HttpErrorResponse): Observable<any> {
    console.log("in handleError");
    let errorMessage: string;
    if(error.status === 0) { // client-side or network error
      errorMessage = this.getClientNetworkErrorMessage(error);
    } else { // server-side error
      errorMessage = this.getServerErrorMessage(error);
    }
    return throwError(errorMessage);
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
