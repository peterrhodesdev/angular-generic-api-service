import { BaseApiEndpointModel } from 'src/app/models/base-api-endpoint.model';

export class TodoModel extends BaseApiEndpointModel<number> {
  userId: number = 0;
  title: string = "";
  completed: boolean = false;
}
