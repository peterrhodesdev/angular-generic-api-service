import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseApiEndpointService } from 'src/app/services/base-api-endpoint.service';
import { TodoModel } from 'src/app/models/todo.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodosApiEndpointService extends BaseApiEndpointService<TodoModel> {

  /* abstract methods from parent */

  public getBaseUrl(): string {
    return environment.API_BASE_URL_JSON_PLACEHOLDER;
  }

  public getEndpoint(): string {
    return environment.API_ENDPOINT_JSON_PLACEHOLDER_TODOS;
  }

  public getInstance(): TodoModel {
    return new TodoModel();
  }

  /* public methods */

  public getManyFilterByUserId(userId: number): Observable<TodoModel[]> {
    let queryObj: any = {
      userId: userId.toString(),
    };
    return this.getMany(queryObj);
  }
}
