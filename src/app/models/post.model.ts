import { BaseApiEndpointModel } from 'src/app/models/base-api-endpoint.model';

export class PostModel extends BaseApiEndpointModel {
  userId: number = 0;
  title: string = "";
  body: string = "";

  public getUpperCaseTitle(): string {
    return this.title.toUpperCase();
  }
}
