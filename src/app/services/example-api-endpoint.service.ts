import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseApiEndpointService } from 'src/app/services/base-api-endpoint.service';
import { ExampleModel } from 'src/app/models/example.model';

@Injectable({
  providedIn: 'root'
})
export class ExampleApiEndpointService extends BaseApiEndpointService<ExampleModel> {

  /* abstract methods from parent */

  public getBaseUrl(): string {
    return 'https://example.com/';
  }

  public getEndpoint(): string {
    return 'endpoint/';
  }

  public getInstance(): ExampleModel {
    return new ExampleModel();
  }
}
