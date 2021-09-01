import { BaseApiEndpointModel } from 'src/app/models/base-api-endpoint.model';
import { Type } from 'class-transformer';

export class UserModel extends BaseApiEndpointModel<number> {
  name: string = '';
  username: string = '';
  email: string = '';
  phone: string = '';
  website: string = '';

  @Type(() => AddressModel)
  address: AddressModel = new AddressModel();

  @Type(() => CompanyModel)
  company: CompanyModel = new CompanyModel();
}

export class AddressModel {
  street: string = '';
  suite: string = '';
  city: string = '';
  zipcode: string = '';
  geo: GeoModel = new GeoModel();
}

export class GeoModel {
  lat: string = '';
  lng: string = '';
}

export class CompanyModel {
  name: string = '';
  catchPhrase: string = '';
  bs: string = '';
}
