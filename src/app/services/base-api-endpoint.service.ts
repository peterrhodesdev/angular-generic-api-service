import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { BaseApiEndpointModel } from 'src/app/models/base-api-endpoint.model';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseApiEndpointService<T extends BaseApiEndpointModel> {

  constructor(private apiService: ApiService) { }

  public abstract getBaseUrl(): string;
  public abstract getEndpoint(): string;

  private requestUrl(): string {
    return `${this.getBaseUrl()}${this.getEndpoint()}`;
  }

  public getMany(): Observable<T[]> {
    return this.apiService.getMany<T>(this.requestUrl());
  }
}
