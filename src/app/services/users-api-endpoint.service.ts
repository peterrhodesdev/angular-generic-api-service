import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseApiEndpointService } from 'src/app/services/base-api-endpoint.service';
import { UserModel } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersApiEndpointService extends BaseApiEndpointService<UserModel> {

  /* abstract methods from parent */

  public getBaseUrl(): string {
    return environment.API_BASE_URL_JSON_PLACEHOLDER;
  }

  public getEndpoint(): string {
    return environment.API_ENDPOINT_JSON_PLACEHOLDER_USERS;
  }

  public getInstance(): UserModel {
    return new UserModel();
  }
}
