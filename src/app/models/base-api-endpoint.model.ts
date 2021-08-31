import { plainToClass } from 'class-transformer';
import { ValidationHelper } from 'src/app/helpers/validation.helper';

export class BaseApiEndpointModel<ID extends number | string> {
  id?: ID;

  public getId(): string | undefined {
    if (ValidationHelper.isNullOrUndefined(this.id)) {
      return undefined;
    }

    if (ValidationHelper.isString(this.id!)) {
      return this.id! as string;
    }

    return this.id!.toString();
  }
}
