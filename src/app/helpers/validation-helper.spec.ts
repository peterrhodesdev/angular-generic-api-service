import { ValidationHelper } from './validation-helper';

describe('ValidationHelper', () => {
  it('#isNull should return true for null object', () => {
    // Arrange
    let nullObject: any = null;

    // Act
    let result = ValidationHelper.isNull(nullObject);

    // Assert
    expect(result).toBeTruthy();
  });

  it('#isNull should return false for non-null objects', () => {
    // Arrange
    let emptyObject: any = {};
    let emptyString: string = "";
    let undefinedObject: any = undefined;
    let falseBoolean: boolean = false;
    let zeroNumber: number = 0;
    let nanNumber: number = NaN;

    // Act
    let emptyObjectResult = ValidationHelper.isNull(emptyObject);
    let emptyStringResult = ValidationHelper.isNull(emptyString);
    let undefinedObjectResult = ValidationHelper.isNull(undefinedObject);
    let falseBooleanResult = ValidationHelper.isNull(falseBoolean);
    let zeroNumberResult = ValidationHelper.isNull(zeroNumber);
    let nanNumberResult = ValidationHelper.isNull(nanNumber);

    // Assert
    expect(emptyObjectResult).toBeFalsy();
    expect(emptyStringResult).toBeFalsy();
    expect(undefinedObjectResult).toBeFalsy();
    expect(falseBooleanResult).toBeFalsy();
    expect(zeroNumberResult).toBeFalsy();
    expect(nanNumberResult).toBeFalsy();
  });
});
