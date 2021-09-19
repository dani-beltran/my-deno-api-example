import { Dictionary } from "../deps.ts";

// STRING
///////////////////////////////

/**
 * Converts the first character of string to upper case.
 * @param str 
 * @returns 
 */
export function upperFirst(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Converts the first character of string to lower case.
 * @param str 
 * @returns 
 */
 export function lowerFirst(str: string) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

/**
 * Converts a string to a Date.
 * Returns undefined if the string cannot be converted to a valid date.
 * @param str 
 * @returns 
 */
export function toDate(str: string) {
  const timestamp = Date.parse(str);
  if (isNaN(timestamp) == false) {
    return new Date(timestamp);
  }
}

// COLLECTION
///////////////////////////////

/**
   * Reducer function to be used with reduce()
   * It transform and array of entries into an pair key/value object.
   * It will also remove any key/value which value is undefined.
   * @param acc 
   * @param current 
   * @returns 
   */
export function entriesToDictionaryReducer<T>(
  acc: Dictionary<T>,
  current: [string, T],
) {
  if (current[1] !== undefined) {
    acc[current[0]] = current[1];
  }
  return acc;
}
