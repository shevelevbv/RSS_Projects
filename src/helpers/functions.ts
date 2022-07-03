import { HtmlTempElementOrNull } from "./types";
import { Errors } from "./enums";

export function checkForNull (item: HtmlTempElementOrNull): HTMLTemplateElement {
  if (!item) {
      throw new Error(Errors.isNull);
  }
  return item;
}