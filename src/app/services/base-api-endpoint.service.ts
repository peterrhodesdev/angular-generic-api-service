import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { BaseApiEndpointModel } from 'src/app/models/base-api-endpoint.model';
import { plainToClassFromExist } from 'class-transformer';
import { QueryParameter } from 'src/app/common/query-parameter';
import { UrlHelper } from 'src/app/helpers/url.helper';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseApiEndpointService<ID extends number | string, T extends BaseApiEndpointModel<ID>> {

  constructor(private apiService: ApiService) { }

  /* abstract methods */

  public abstract getBaseUrl(): string;
  public abstract getEndpoint(): string;
  public abstract getInstance(): T;

  /* GET (read) */

  public getMany(params: QueryParameter[] = []): Observable<T[]> {
    let queryString: string = UrlHelper.getValidQueryString(params);
    let requestUrl: string = this.endpointUrl() + queryString;

    return this.apiService.getMany<T>(requestUrl)
      .pipe(
        map(response => { 
          return response.map(item => plainToClassFromExist(this.getInstance(), item));
        }));
  }

  public getOne(id: ID): T {
    throw Error("Not implemented");
  }

  /* private methods */

  private endpointUrl(): string {
    return `${this.getBaseUrl()}${this.getEndpoint()}`;
  }
}
