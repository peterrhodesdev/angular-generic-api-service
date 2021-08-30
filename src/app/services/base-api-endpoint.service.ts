import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { BaseApiEndpointModel } from 'src/app/models/base-api-endpoint.model';
import { plainToClassFromExist } from 'class-transformer';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseApiEndpointService<T extends BaseApiEndpointModel> {

  constructor(private apiService: ApiService) { }

  public abstract getBaseUrl(): string;
  public abstract getEndpoint(): string;
  public abstract getInstance(): T;

  private requestUrl(): string {
    return `${this.getBaseUrl()}${this.getEndpoint()}`;
  }

  public getMany(): Observable<T[]> {
    return this.apiService.getMany<T>(this.requestUrl())
      .pipe(
        map(response => { 
          return response.map(item => plainToClassFromExist(this.getInstance(), item));
        }));
  }
}
