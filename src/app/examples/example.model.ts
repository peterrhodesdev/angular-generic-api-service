import { BaseApiEndpointModel } from 'src/app/models/base-api-endpoint.model';
import { Type } from 'class-transformer';

export class ExampleModel extends BaseApiEndpointModel<number> {
  strProp: string = '';
  arrProp: string[] = [];
  optProp?: string = undefined;

  @Type(() => NestedObject)
  nestedObj: NestedObject = new NestedObject();

  public exampleMethod(): string {
    return 'can call this method after transformation';
  }
}

export class NestedObject {
  prop1: string = '';
}
