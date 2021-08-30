import { BaseApiEndpointModel } from 'src/app/models/base-api-endpoint.model';

export interface PostModel extends BaseApiEndpointModel {
  userId: number;
  title: string;
  body: string;
}
