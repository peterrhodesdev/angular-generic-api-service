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

  public getFirstName(): string {
    return this.name.split(' ')[0];
  }

  public getLastName(): string {
    let names: string[] = this.name.split(' ');
    return names[names.length - 1];
  }
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

  public toDegreesMinutesSeconds(): string {
    let latDecimal: number = parseFloat(this.lat);
    let lngDecimal: number = parseFloat(this.lng);

    let [latDegrees, latMinutes, latSeconds] = this.convertDecimalToDegreesMinutesSeconds(latDecimal);
    let [lngDegrees, lngMinutes, lngSeconds] = this.convertDecimalToDegreesMinutesSeconds(lngDecimal);

    let latCardinal = latDecimal >= 0 ? "N" : "S";
    var lngCardinal = lngDecimal >= 0 ? "E" : "W";

    return this.degreesMinutesSecondsToString(latDegrees, latMinutes, latSeconds) + ` ${latCardinal}, `
      + this.degreesMinutesSecondsToString(lngDegrees, lngMinutes, lngSeconds) + ` ${lngCardinal}`;
  }

  private degreesMinutesSecondsToString(degrees: number, minutes: number, seconds: number): string {
    return `${degrees}\u00B0 ${minutes}' ${seconds}"`;
  }

  private convertDecimalToDegreesMinutesSeconds(coordinate: number): [number, number, number] {
    let abs: number = Math.abs(coordinate);
    let degrees: number = Math.floor(abs);
    let minutesDecimal: number = (abs - degrees) * 60;
    let minutes: number = Math.floor(minutesDecimal);
    let seconds: number = Math.floor((minutesDecimal - minutes) * 60);
    
    return [degrees, minutes, seconds];
  }
}

export class CompanyModel {
  name: string = '';
  catchPhrase: string = '';
  bs: string = '';
}
