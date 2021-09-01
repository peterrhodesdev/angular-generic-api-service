export type ID = number | string;

export abstract class BaseApiEndpointModel<ID> {
  id?: ID;
}

/* Create a type that requires an 'id' field and one other field */

type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>;
type AtLeastId<T extends BaseApiEndpointModel<ID>> = AtLeast<T, 'id'>;

type AtLeastOne<T, U = {[K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U]
type AtLeastOneFieldBesidesId<T> = AtLeastOne<Omit<T, 'id'>>;

export type AtLeastIdAndOneField<T> = AtLeastId<T> & AtLeastOneFieldBesidesId<T>;
