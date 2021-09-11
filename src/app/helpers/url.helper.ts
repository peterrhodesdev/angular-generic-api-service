import { stringify as qs_stringify } from 'qs';

export abstract class UrlHelper {

  // https://datatracker.ietf.org/doc/html/rfc3986#section-2.2
  // https://datatracker.ietf.org/doc/html/rfc3986#section-3.4
  public static isQueryStringValid(queryString: string) {
    let validCharacter: string = `([\\w-]|%[0-9A-Fa-f]{2})`;
    let pattern: RegExp = new RegExp(`^\\?(${validCharacter}+(=${validCharacter}*)?(&${validCharacter}+(=${validCharacter}*)?)*)?$`);
    return pattern.test(queryString);
  }

  public static createQueryString(queryObj: any): string {
    let queryString: string = qs_stringify(queryObj);
    return queryString !== '' ? '?' + queryString : '';
  }
}
