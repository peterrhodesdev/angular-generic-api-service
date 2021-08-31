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

  public static isEmptyNullOrUndefined(str?: string): boolean {
    return ValidationHelper.isNullOrUndefined(str) || ValidationHelper.isEmpty(str!);
  }
}
