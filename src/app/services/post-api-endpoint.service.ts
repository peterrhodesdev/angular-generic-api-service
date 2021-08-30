import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseApiEndpointService } from 'src/app/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class PostApiEndpointService extends BaseApiEndpointService {

  constructor() {
    super(environment.API_BASE_URL_JSON_PLACEHOLDER, environment.API_ENDPOINT_JSON_PLACEHOLDER_POSTS);
  }
}
