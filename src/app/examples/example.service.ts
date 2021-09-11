import { Injectable } from '@angular/core';
import { BaseApiEndpointService } from 'src/app/services/base-api-endpoint.service';
import { ExampleModel } from 'src/app/examples/example.model';

@Injectable({
  providedIn: 'root'
})
export class ExampleService extends BaseApiEndpointService<ExampleModel> {

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
