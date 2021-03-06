import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { AtLeastIdAndOneField, BaseApiEndpointModel, ID } from 'src/app/models/base-api-endpoint.model';
import { plainToClassFromExist } from 'class-transformer';
import { UrlHelper } from 'src/app/helpers/url.helper';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseApiEndpointService<T extends BaseApiEndpointModel<ID>> {

  private mapResponseToT = map(response => {
    return plainToClassFromExist(this.getInstance(), response);
  });

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
  public create(t: T): Observable<T> | never {
    return this.apiService.post<T>(this.endpointUrl(), t)
      .pipe(this.mapResponseToT);
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
  public getMany(queryObj: any = {}): Observable<T[]> {
    let queryString: string = UrlHelper.createQueryString(queryObj);
    let requestUrl: string = this.endpointUrl() + queryString;

    return this.apiService.getMany<T>(requestUrl)
      .pipe(
        map(response => { 
          return response.map(item => plainToClassFromExist(this.getInstance(), item));
        })
      );
  }

  /**
   * Get a single model by id.
   */
  public getOne(id: ID): Observable<T> {
    return this.apiService.getOne<T>(this.endpointUrlWithId(id))
      .pipe(this.mapResponseToT);
  }

  /**
   * Perform a full update of a model.
   *
   * @throws Error From this.getModelId
   * @throws Error From this.apiService.put
   */
  public updateFull(t: T): Observable<T> | never {
    let id: ID = this.getModelId(t);
    return this.apiService.put<T>(this.endpointUrlWithId(id), t)
      .pipe(this.mapResponseToT);
  }

  /**
   * Perform a partial update of a model.
   *
   * @throws Error From this.getModelId
   * @throws Error From this.apiService.put
   */
  public updatePartial(partialT: AtLeastIdAndOneField<T>): Observable<T> | never {
    let id: ID = this.getModelId(partialT);
    return this.apiService.patch<T>(this.endpointUrlWithId(id), partialT)
      .pipe(this.mapResponseToT);
  }

  /* private methods */

  private endpointUrl(): string {
    return `${this.getBaseUrl()}${this.getEndpoint()}`;
  }

  private endpointUrlWithId(id: ID): string {
    return `${this.endpointUrl()}${id}`;
  }

  /**
   * @throws Error If the id field of the model is not defined.
   */
  private getModelId(partialT: Partial<T>): ID | never {
    if (partialT.id === null || typeof partialT.id === "undefined") {
      throw Error(`Illegal Argument Error: model id must be defined`);
    }
    return partialT.id!;
  }
}
