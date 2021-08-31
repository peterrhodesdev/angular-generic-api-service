import { ValidationHelper } from './validation.helper';

describe('ValidationHelper', () => {
  it('#isNull should return true for null variable', () => {
    // Arrange
    let nullObject: any = null;

    // Act
    let result = ValidationHelper.isNull(nullObject);

    // Assert
    expect(result).toBeTruthy();
  });

  it('#isNull should return false for non-null variables', () => {
    // Arrange
    let undefinedObject: any = undefined;
    let emptyObject: any = {};
    let emptyString: string = '';
    let falseBoolean: boolean = false;
    let zeroNumber: number = 0;
    let nanNumber: number = NaN;

    // Act
    let undefinedObjectResult = ValidationHelper.isNull(undefinedObject);
    let emptyObjectResult = ValidationHelper.isNull(emptyObject);
    let emptyStringResult = ValidationHelper.isNull(emptyString);
    let falseBooleanResult = ValidationHelper.isNull(falseBoolean);
    let zeroNumberResult = ValidationHelper.isNull(zeroNumber);
    let nanNumberResult = ValidationHelper.isNull(nanNumber);

    // Assert
    expect(undefinedObjectResult).toBeFalsy();
    expect(emptyObjectResult).toBeFalsy();
    expect(emptyStringResult).toBeFalsy();
    expect(falseBooleanResult).toBeFalsy();
    expect(zeroNumberResult).toBeFalsy();
    expect(nanNumberResult).toBeFalsy();
  });

  it('#isUndefined should return true for undefined variable', () => {
    // Arrange
    let undefinedObject: any = undefined;

    // Act
    let result = ValidationHelper.isUndefined(undefinedObject);

    // Assert
    expect(result).toBeTruthy();
  });

  it('#isUndefined should return false for non-undefined variables', () => {
    // Arrange
    let nullObject: any = null;
    let emptyObject: any = {};
    let emptyString: string = '';
    let falseBoolean: boolean = false;
    let zeroNumber: number = 0;
    let nanNumber: number = NaN;

    // Act
    let nullObjectResult = ValidationHelper.isUndefined(nullObject);
    let emptyObjectResult = ValidationHelper.isUndefined(emptyObject);
    let emptyStringResult = ValidationHelper.isUndefined(emptyString);
    let falseBooleanResult = ValidationHelper.isUndefined(falseBoolean);
    let zeroNumberResult = ValidationHelper.isUndefined(zeroNumber);
    let nanNumberResult = ValidationHelper.isUndefined(nanNumber);

    // Assert
    expect(nullObjectResult).toBeFalsy();
    expect(emptyObjectResult).toBeFalsy();
    expect(emptyStringResult).toBeFalsy();
    expect(falseBooleanResult).toBeFalsy();
    expect(zeroNumberResult).toBeFalsy();
    expect(nanNumberResult).toBeFalsy();
  });

  it('#isEmpty should return true for empty string', () => {
    // Arrange
    let emptyString: string = '';

    // Act
    let result = ValidationHelper.isEmpty(emptyString);

    // Assert
    expect(result).toBeTruthy();
  });

  it('#isEmpty should return false for non-empty strings', () => {
    // Arrange
    let spaceString: string = ' ';
    let singleCharacterString: string = 'a';
    let multipleCharacterString: string = 'abc';

    // Act
    let spaceStringResult = ValidationHelper.isEmpty(spaceString);
    let singleCharacterStringResult = ValidationHelper.isEmpty(singleCharacterString);
    let multipleCharacterStringResult = ValidationHelper.isEmpty(multipleCharacterString);

    // Assert
    expect(spaceStringResult).toBeFalsy();
    expect(singleCharacterStringResult).toBeFalsy();
    expect(multipleCharacterStringResult).toBeFalsy();
  });

  it('#isArrayEmpty should return true for empty array', () => {
    // Arrange
    let emptyArray: any[] = [];

    // Act
    let result = ValidationHelper.isArrayEmpty(emptyArray);

    // Assert
    expect(result).toBeTruthy();
  });

  it('#isArrayEmpty should return false for non-empty array', () => {
    // Arrange
    let nonEmptyArray: any[] = [ {} ];

    // Act
    let result = ValidationHelper.isArrayEmpty(nonEmptyArray);

    // Assert
    expect(result).toBeFalsy();
  });

  it('#isString should return false for non-strings', () => {
    // Arrange
    let num: number = 0;
    let bool: boolean = false;
    let arr: string[] = [];
    let obj: any = {};

    // Act
    let numResult = ValidationHelper.isString(num);
    let boolResult = ValidationHelper.isString(bool);
    let arrResult = ValidationHelper.isString(arr);
    let objResult = ValidationHelper.isString(obj);

    // Assert
    expect(numResult).toBeFalsy();
    expect(boolResult).toBeFalsy();
    expect(arrResult).toBeFalsy();
    expect(objResult).toBeFalsy();
  });

  it('#isString should return true for string', () => {
    // Arrange
    let str: string = '';

    // Act
    let result = ValidationHelper.isString(str);

    // Assert
    expect(result).toBeTruthy();
  });
});
