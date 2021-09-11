import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, concatMap, delay, retryWhen } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  private retryAttempts: number = environment.HTTP_ERROR_RETRY_ATTEMPTS;
  private retryStatusCodes: number[] = environment.HTTP_ERROR_RETRY_STATUS_CODES;
  private retryInitialIntervalMs: number = environment.HTTP_ERROR_RETRY_INITIAL_INTERVAL_MILLISECONDS;
  private retryExpDelayBase: number = environment.HTTP_ERROR_RETRY_EXPONENTIAL_DELAY_BASE;

  constructor(private router: Router) {}

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
        if (index < this.retryAttempts && this.retryStatusCodes.includes(error.status)) { // retry with delay
          let delayMs: number = this.calculateDelayMs(index);
          return of(error).pipe(delay(delayMs));
        }
        return throwError(error);
      }),
    );
  }

  /**
   * Calculates the delay required before the request is retried.
   * The calculation uses a power function (a^b * c) to exponentially increase the length of the delay.
   * @param {number} retry iteration (starting from zero) used as the exponent in the power function
   * @return {number} length of time to delay in milliseconds
   */
  private calculateDelayMs(iteration: number): number {
    return Math.pow(this.retryExpDelayBase, iteration) * this.retryInitialIntervalMs;
  }

  /* handle error */

  private handleError(error: HttpErrorResponse): Observable<any> {
    let errorMessage: string | undefined;
    if(error.status === 0) { // client-side or network error
      errorMessage = this.handleClientError(error);
    } else { // server-side error
      errorMessage = this.handleServerError(error);
    }

    if (!errorMessage) { // error was handled
      return of(error);
    }
    return throwError(errorMessage);
  }

  private handleClientError(error: HttpErrorResponse): string {
    if (!navigator.onLine) {
      return 'No internet connection';
    }
    return error.error.message;
  }

  /**
   * Attempt to handle the server-side error, otherwise create an error message.
   * @return {string | undefined} a string with the error message, or undefined if the error was handled
   */
  private handleServerError(error: HttpErrorResponse): string | undefined {
    let errorMessage: string | undefined;

    switch (error.status) {
      case HttpStatusCode.Unauthorized:
      case HttpStatusCode.Forbidden:
        this.router.navigateByUrl('/login');
        break;
      case HttpStatusCode.NotFound:
        errorMessage = 'N\u{1F621}T F\u{1F62D}UND';
        break;
      default:
        errorMessage = `Error status: ${error.status}, error message: ${error.message}`;
    }

    return errorMessage;
  }
}
