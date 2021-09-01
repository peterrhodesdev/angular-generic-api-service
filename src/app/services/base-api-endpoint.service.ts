import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { BaseApiEndpointModel } from 'src/app/models/base-api-endpoint.model';
import { plainToClassFromExist } from 'class-transformer';
import { QueryParameter } from 'src/app/common/query-parameter';
import { UrlHelper } from 'src/app/helpers/url.helper';
import { ValidationHelper } from 'src/app/helpers/validation.helper';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseApiEndpointService<ID extends number | string, T extends BaseApiEndpointModel<ID>> {

  private pipeOperations = pipe(
    map(response => {
      return plainToClassFromExist(this.getInstance(), response);
    })
  );

  constructor(private apiService: ApiService) { }

  /* abstract methods */

  public abstract getBaseUrl(): string;
  public abstract getEndpoint(): string;
  public abstract getInstance(): T;

  /* public methods */

  /**
   * Create a new model.
   *
   * @throws Error From this.apiService.post
   */
  public create(t: T): Observable<T> {
    return this.apiService.post<T>(this.endpointUrl(), t)
      .pipe(this.pipeOperations);
  }

  /**
   * Delete a model by id.
   */
  public delete(id: ID): Observable<any> {
    return this.apiService.delete(this.endpointUrlWithId(id));
  }

  /**
   * Get multiple models.
   */
  public getMany(params: QueryParameter[] = []): Observable<T[]> {
    let queryString: string = UrlHelper.getValidQueryString(params);
    let requestUrl: string = this.endpointUrl() + queryString;

    return this.apiService.getMany<T>(requestUrl)
      .pipe(
        map(response => { 
          return response.map(item => plainToClassFromExist(this.getInstance(), item));
        }));
  }

  /**
   * Get a single model by id.
   */
  public getOne(id: ID): Observable<T> {
    return this.apiService.getOne<T>(this.endpointUrlWithId(id))
      .pipe(this.pipeOperations);
  }

  /**
   * Perform a full update of a model specified by id.
   *
   * @throws Error If the id field of the model is defined and doesn't match the id argument.
   * @throws Error From this.apiService.put
   */
  public updateFull(id: ID, t: T): Observable<T> {
    if (!ValidationHelper.isNullOrUndefined(t.id) && t.id! !== id) {
      throw Error(`Illegal Argument Error: model id ${t.id} doesn't match argument id ${id}`);
    }

    return this.apiService.put<T>(this.endpointUrlWithId(id), t)
      .pipe(this.pipeOperations);
  }

  /**
   * Perform a partial update of a model specified by id.
   *
   * @throws Error TODO
   * @throws Error From this.apiService.put
   */
  public updatePartial(id: ID, partialT: Partial<T>): Observable<Partial<T>> {
    if (ValidationHelper.isNullOrUndefined(partialT)) {
      throw Error("Illegal Argument Error: object must be defined");
    }

    return this.apiService.patch<T>(this.endpointUrlWithId(id), partialT)
      .pipe(this.pipeOperations);
  }

  /* private methods */

  private endpointUrl(): string {
    return `${this.getBaseUrl()}${this.getEndpoint()}`;
  }

  private endpointUrlWithId(id: ID): string {
    return `${this.endpointUrl()}${id}`;
  }
}
