export abstract class ValidationHelper {

  public static isNull<T>(t?: T): boolean {
    return t === null;
  }

  public static isUndefined<T>(t?: T): boolean {
    return typeof t === "undefined";
  }

  public static isNullOrUndefined<T>(t?: T): boolean {
    return ValidationHelper.isNull(t) || ValidationHelper.isUndefined(t);
  }

  public static isEmpty(str: string): boolean {
    return str === "";
  }

  // String not empty, null, or undefined
  public static hasNonEmptyValue(str?: string): boolean {
    return !ValidationHelper.isNullOrUndefined(str) && !ValidationHelper.isEmpty(str!);
  }

  public static isArrayEmpty<T>(t: T[]): boolean {
    return t.length === 0;
  }

  // Array not empty, null, or undefined
  public static hasElements<T>(t?: T[]): boolean {
    return !ValidationHelper.isNullOrUndefined(t) && !ValidationHelper.isArrayEmpty(t!);
  }

  public static isString<T>(t: T): boolean {
    return typeof t === 'string' || t instanceof String;
  }
}
