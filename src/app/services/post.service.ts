import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseApiEndpointService } from 'src/app/services/base-api-endpoint.service';
import { PostModel } from 'src/app/models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService extends BaseApiEndpointService<PostModel> {

  public getBaseUrl(): string {
    return environment.API_BASE_URL_JSON_PLACEHOLDER;
  }

  public getEndpoint(): string {
    return environment.API_ENDPOINT_JSON_PLACEHOLDER_POSTS;
  }
}
