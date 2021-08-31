import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    return this.httpClient.delete(url, this.httpOptions);
  }

  /* GET (read) */

  public getMany<T>(url: string): Observable<T[]> {
    return this.httpClient.get<T[]>(url, this.httpOptions);
  }

  public getOne<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(url, this.httpOptions);
  }

  /* PATCH (partial update) */

  public patch<T>(url: string, partialT: Partial<T>): Observable<Partial<T>> {
    return this.httpClient.patch<Partial<T>>(url, JSON.stringify(partialT), this.httpOptions);
  }

  /* POST (create) */

  public post<T>(url: string, t: T): Observable<T> {
    return this.httpClient.post<T>(url, JSON.stringify(t), this.httpOptions);
  }

  /* PUT (full update) */

  public put<T>(url: string, t: T): Observable<T> {
    return this.httpClient.put<T>(url, JSON.stringify(t), this.httpOptions);
  }
}
