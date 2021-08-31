import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, pipe, throwError } from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  /* DELETE */

  public delete(url: string): Observable<any> {
    let obs: Observable<any> = this.httpClient.delete(url, this.httpOptions);
    return this.applyPipeOperations(obs);
  }

  /* GET (read) */

  public getMany<T>(url: string): Observable<T[]> {
    let obs: Observable<T[]> = this.httpClient.get<T[]>(url, this.httpOptions);
    return this.applyPipeOperations(obs);
  }

  public getOne<T>(url: string): Observable<T> {
    let obs: Observable<T> = this.httpClient.get<T>(url, this.httpOptions);
    return this.applyPipeOperations(obs);
  }

  /* PATCH (partial update) */

  public patch<T>(url: string, partialT: Partial<T>): Observable<Partial<T>> {
    let obs: Observable<Partial<T>> = this.httpClient.patch<Partial<T>>(url, JSON.stringify(partialT), this.httpOptions);
    return this.applyPipeOperations(obs);
  }

  /* POST (create) */

  public post<T>(url: string, t: T): Observable<T> {
    let obs: Observable<T> = this.httpClient.post<T>(url, JSON.stringify(t), this.httpOptions);
    return this.applyPipeOperations(obs);
  }

  /* PUT (full update) */

  public put<T>(url: string, t: T): Observable<T> {
    let obs: Observable<T> = this.httpClient.put<T>(url, JSON.stringify(t), this.httpOptions);
    return this.applyPipeOperations(obs);
  }

  /* private methods */

  private errorHandler(error: HttpErrorResponse): Observable<any> {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) { // client-side error
      errorMessage = error.error.message;
    } else { // server-side error
      errorMessage = `Error status: ${error.status}, error message: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  private applyPipeOperations(obs: Observable<any>): Observable<any> {
    if (!environment.production) {
      obs = obs.pipe(
        delay(500), // simulate delay in response
        tap(res => console.log('HTTP response:', res)),
      );
    }

    return obs.pipe(
      catchError(this.errorHandler)
    );
  }
}
