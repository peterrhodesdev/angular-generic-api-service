import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Observable, of, pipe, throwError } from 'rxjs';
import { catchError, concatMap, delay, retryWhen } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  private retryAttempts: number;
  private retryStatusCodes: number[];
  private retryInitialIntervalMs: number;
  private retryExpDelayBase: number;

  constructor() {
    this.retryAttempts = environment.HTTP_ERROR_RETRY_ATTEMPTS;
    this.retryStatusCodes = environment.HTTP_ERROR_RETRY_STATUS_CODES; 
    this.retryInitialIntervalMs = environment.HTTP_ERROR_RETRY_INITIAL_INTERVAL_MILLISECONDS;
    this.retryExpDelayBase = environment.HTTP_ERROR_RETRY_EXPONENTIAL_DELAY_BASE;
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
          let delayMs: number = this.calculateDelayMs(index);
          return of(error).pipe(delay(delayMs));
        }
        return throwError(error);
      }),
    );
  }

  private calculateDelayMs(iteration: number): number {
    return Math.pow(this.retryExpDelayBase, iteration) * this.retryInitialIntervalMs;
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
