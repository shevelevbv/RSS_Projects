import { Errors } from "./enums";

export function checkForNull<T> (item: T): Exclude<T, null> {
  if (!item) {
      throw new Error(Errors.isNull);
  }
  return item as Exclude<T, null>;
}