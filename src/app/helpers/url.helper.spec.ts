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
});
