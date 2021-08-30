import { plainToClass } from 'class-transformer';

export class BaseApiEndpointModel {
  id?: number | string;

  public static classFromJsonObject(jsonObject: any) {
    return plainToClass(BaseApiEndpointModel, jsonObject);
  }
}
