import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Observable, of, pipe, throwError } from 'rxjs';
import { catchError, concatMap, delay, retryWhen } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  private retryAttempts: number;
  private retryStatusCodes: number[];
  private retryInitialIntervalMillis: number;
  private retryExponentialDelayBase: number;

  constructor() {
    this.retryAttempts = 3;
    this.retryStatusCodes = [ 
      HttpStatusCode.NotFound, // 404
      HttpStatusCode.RequestTimeout, // 408
      HttpStatusCode.InternalServerError, // 500
      HttpStatusCode.ServiceUnavailable, // 503
      HttpStatusCode.GatewayTimeout, // 504
    ];
    this.retryInitialIntervalMillis = 1000;
    this.retryExponentialDelayBase = 1.5;
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retryWhen((errors: Observable<any>) => this.handleRetries(errors)),
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  /* handle retries */

  private handleRetries(errors: Observable<any>): Observable<any> {
    return errors.pipe(
      // Handle the errors in order
      concatMap((error, index) => {
        if (index < this.retryAttempts && this.retryStatusCodes.includes(error.status)) {
          // Retry with delay
          let delayMillis: number = this.calculateDelayMillis(index);
          return of(error).pipe(delay(delayMillis));
        }
        return throwError(error);
      }),
    );
  }

  private calculateDelayMillis(iteration: number): number {
    return Math.pow(this.retryExponentialDelayBase, iteration) * this.retryInitialIntervalMillis;
  }

  /* handle error */

  private handleError(error: HttpErrorResponse): Observable<any> {
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
      case HttpStatusCode.NotFound:
        return `Not found: ${error.message}`;
      default:
        return `Error status: ${error.status}, error message: ${error.message}`;
    }
  }
}
