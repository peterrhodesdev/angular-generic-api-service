import { QueryParameter } from 'src/app/common/query-parameter';
import { ValidationHelper } from 'src/app/helpers/validation.helper';

export abstract class UrlHelper {

  // https://datatracker.ietf.org/doc/html/rfc3986#section-2.2
  // https://datatracker.ietf.org/doc/html/rfc3986#section-3.4
  public static isQueryStringValid(queryString: string) {
    return /^\?([\w-]+(=[\w-]*)?(&[\w-]+(=[\w-]*)?)*)?$/.test(queryString);
  }

  public static getValidQueryString(params: QueryParameter[]): string {
    // Filter out empty names
    let validParams: QueryParameter[] = params.filter(element => !ValidationHelper.isEmpty(element.name));
    if (!ValidationHelper.hasElements(validParams)) {
      return '';
    }

    let queryStringElements: string[] = [];
    for (let param of validParams) {
      let element: string = encodeURIComponent(param.name);
      if (ValidationHelper.hasNonEmptyValue(param.value)) {
        element += '=' + encodeURIComponent(param.value!);
      }
      queryStringElements.push(element);
    }

    let queryString: string = '?' + queryStringElements.join('&');
    return UrlHelper.isQueryStringValid(queryString) ? queryString : '';
  }
}
