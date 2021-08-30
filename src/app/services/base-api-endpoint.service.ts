import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class BaseApiEndpointService<T extends BaseApiEndpointModel> {

  private baseUrl: string;
  private endpoint: string;

  constructor(
    private apiService: ApiService,
    baseUrl: string,
    endpoint: string
  ) {
    this.baseUrl = baseUrl;
    this.endpoint = endpoint;
  }

  private requestUrl(): string {
    return `${this.baseUrl}/${this.endpoint}`;
  }

  public getMany(url: string): Observable<T[]> {
    return this.apiService.get<T[]>(this.requestUrl());
  }
}
