import { UrlHelper } from './url.helper';
import { QueryParameter } from 'src/app/common/query-parameter';

describe('UrlHelper', () => {

  it('#isQueryStringValid should return true for unreserved characters', () => {
    // Arrange
    let alpha: string = '?abc=def';
    let numeric: string = '?123=456';
    let special: string = '?-_=-_';

    // Act
    let alphaResult = UrlHelper.isQueryStringValid(alpha);
    let numericResult = UrlHelper.isQueryStringValid(numeric);
    let specialResult = UrlHelper.isQueryStringValid(special);

    // Assert
    expect(alphaResult).toBeTruthy();
    expect(numericResult).toBeTruthy();
    expect(specialResult).toBeTruthy();
  });

  it('#isQueryStringValid should return false for reserved characters', () => {
    // Arrange
    let delimeters: string = ':/?#[]@';
    let subDelimeters: string = `!$&'()*+,;=`
    let queryString: string = `?${delimeters}=${subDelimeters}`;

    // Act
    let result = UrlHelper.isQueryStringValid(queryString);

    // Assert
    expect(result).toBeFalsy();
  });

  it('#isQueryStringValid should return true for multiple params', () => {
    // Arrange
    let queryString: string = '?name1=value1&name2=value2';

    // Act
    let result = UrlHelper.isQueryStringValid(queryString);

    // Assert
    expect(result).toBeTruthy();
  });

  it('#isQueryStringValid should return true for optional param values', () => {
    // Arrange
    let queryString: string = '?novalue';

    // Act
    let result = UrlHelper.isQueryStringValid(queryString);

    // Assert
    expect(result).toBeTruthy();
  });

  it('#getValidQueryString should return an empty string when there are no params', () => {
    // Arrange
    let params: QueryParameter[] = [];

    // Act
    let paramsResult = UrlHelper.getValidQueryString(params);

    // Assert
    let emptyString: string = '';
    expect(paramsResult).toEqual(emptyString);
  });

  it('#getValidQueryString should filter out empty names', () => {
    // Arrange
    let emptyString: string = '';
    let params: QueryParameter[] = [
      new QueryParameter(emptyString, 'value'),
    ];

    // Act
    let paramsResult = UrlHelper.getValidQueryString(params);

    // Assert
    expect(paramsResult).toEqual(emptyString);
  });

  it('#getValidQueryString should return string for single param', () => {
    // Arrange
    let params: QueryParameter[] = [
      new QueryParameter('name', 'value'),
    ];

    // Act
    let paramsResult = UrlHelper.getValidQueryString(params);

    // Assert
    expect(paramsResult).toEqual('?name=value');
  });

  it('#getValidQueryString should return string with escaped reserved characters', () => {
    // Arrange
    let params: QueryParameter[] = [
      new QueryParameter('name', 'value with spaces'),
    ];

    // Act
    let paramsResult = UrlHelper.getValidQueryString(params);

    // Assert
    expect(paramsResult).toEqual('?name=value%20with%20spaces');
  });

  it('#getValidQueryString should return string for multiple params', () => {
    // Arrange
    let params: QueryParameter[] = [
      new QueryParameter('name1', 'value1'),
      new QueryParameter('name2', ''),
      new QueryParameter('name3', undefined),
      new QueryParameter('name4', 'value2'),
    ];

    // Act
    let paramsResult = UrlHelper.getValidQueryString(params);

    // Assert
    expect(paramsResult).toEqual('?name1=value1&name2&name3&name4=value2');
  });
});
