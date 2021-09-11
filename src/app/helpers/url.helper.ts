import { QueryParameter } from 'src/app/common/query-parameter';

export abstract class UrlHelper {

  // https://datatracker.ietf.org/doc/html/rfc3986#section-2.2
  // https://datatracker.ietf.org/doc/html/rfc3986#section-3.4
  public static isQueryStringValid(queryString: string) {
    let validCharacter: string = `([\\w-]|%[0-9A-Fa-f]{2})`;
    let pattern: RegExp = new RegExp(`^\\?(${validCharacter}+(=${validCharacter}*)?(&${validCharacter}+(=${validCharacter}*)?)*)?$`);
    return pattern.test(queryString);
  }

  public static getValidQueryString(params: QueryParameter[]): string {
    // Filter out empty names
    let validParams: QueryParameter[] = params.filter(element => element.name !== '');
    if (validParams.length === 0) {
      return '';
    }

    let queryStringElements: string[] = [];
    for (let param of validParams) {
      let element: string = encodeURIComponent(param.name);
      if (param.value !== null && typeof param.value !== 'undefined' && param.value !== '') {
        element += '=' + encodeURIComponent(param.value!);
      }
      queryStringElements.push(element);
    }

    let queryString: string = '?' + queryStringElements.join('&');
    return UrlHelper.isQueryStringValid(queryString) ? queryString : '';
  }
}
