import { BaseApiEndpointModel } from 'src/app/models/base-api-endpoint.model';
import { Type } from 'class-transformer';

export class ExampleModel extends BaseApiEndpointModel<number> {
  name: string = '';

  @Type(() => NestedObject)
  nestedObject: NestedObject = new NestedObject();

  public testMethod(): string {
    return 'can call this method';
  }
}

export class NestedObject {
  prop1: string = '';
}
