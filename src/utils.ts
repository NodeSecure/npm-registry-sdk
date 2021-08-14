/**
 * @namespace utils
 */

/**
 * @version 0.1.0
 * @author GENTILHOMME Thomas <gentilhomme.thomas@gmail.com>
 *
 * @function Clamp
 * @memberof utils#
 * @description Clamp a given number into min and max
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
export function clamp(property, min = 0, max = 1) {
	if (typeof property !== 'number') {
		throw new TypeError('property should be typeof number');
	}

	return Math.min(Math.max(property, min), max);
}
