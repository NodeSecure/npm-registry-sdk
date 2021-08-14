/**
 * @description clamp a given number between a minimum and maximum value
 *
 * @param {!number} property property
 * @param {number} [min=0] min
 * @param {number} [max=1] max
 * @returns {number}
 *
 * @throws {TypeError}
 *
 * @example
 * console.log(clamp(20, 0, 15)); // 15
 * console.log(clamp(-20, 0, 1)); // 0
 */
export function clamp(property: number, min = 0, max = 1): number {
  if (typeof property !== "number") {
    throw new TypeError("property should be typeof number");
  }

  return Math.min(Math.max(property, min), max);
}
