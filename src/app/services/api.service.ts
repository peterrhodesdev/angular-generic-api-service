import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, pipe, throwError } from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ValidationHelper } from 'src/app/helpers/validation.helper';

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

  /* public methods */

  /**
   * Performs a HTTP DELETE method request to delete a resource.
   */
  public delete(url: string): Observable<any> {
    let obs: Observable<any> = this.httpClient.delete(url, this.httpOptions);
    return this.applyPipeOperations(obs);
  }

  /**
   * Performs a HTTP GET method request to retrieve multiple resources.
   */
  public getMany<T>(url: string): Observable<T[]> {
    let obs: Observable<T[]> = this.httpClient.get<T[]>(url, this.httpOptions);
    return this.applyPipeOperations(obs);
  }

  /**
   * Performs a HTTP GET method request to retrieve a single resource.
   */
  public getOne<T>(url: string): Observable<T> {
    let obs: Observable<T> = this.httpClient.get<T>(url, this.httpOptions);
    return this.applyPipeOperations(obs);
  }

  /**
   * Performs a HTTP PATCH method request to modfiy a resource.
   *
   * @throws Error From this.convertObjToJsonString
   */
  public patch<T>(url: string, partialT: Partial<T>): Observable<T> | never {
    let jsonString: string = this.convertObjToJsonString(partialT);
    let obs: Observable<T> = this.httpClient.patch<T>(url, jsonString, this.httpOptions);
    return this.applyPipeOperations(obs);
  }

  /**
   * Performs a HTTP POST method request to create a resource.
   *
   * @throws Error From this.convertObjToJsonString
   */
  public post<T>(url: string, t: T): Observable<T> | never {
    let jsonString: string = this.convertObjToJsonString(t);
    let obs: Observable<T> = this.httpClient.post<T>(url, jsonString, this.httpOptions);
    return this.applyPipeOperations(obs);
  }

  /**
   * Performs a HTTP PUT method request to replace a resource.
   *
   * @throws Error From this.convertObjToJsonString
   */
  public put<T>(url: string, t: T): Observable<T> | never {
    let jsonString: string = this.convertObjToJsonString(t);
    let obs: Observable<T> = this.httpClient.put<T>(url, jsonString, this.httpOptions);
    return this.applyPipeOperations(obs);
  }

  /* private methods */

  private applyPipeOperations(obs: Observable<any>): Observable<any> {
    if (!environment.production) {
      obs = obs.pipe(
        //delay(500), // simulate delay in response
        tap(res => console.log('HTTP response:', res)),
      );
    }

    return obs.pipe(
      //catchError(this.errorHandler)
    );
  }

  /**
   * @throws Error If the obj argument is null or undefined.
   */
  private convertObjToJsonString(obj: any): string | never {
    if (ValidationHelper.isNullOrUndefined(obj)) {
      throw Error("Illegal Argument Error: can't convert null or undefined objects to JSON string");
    }
    return JSON.stringify(obj);
  }
}
