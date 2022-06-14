/**
 * 
 * @param {Number} number Number from 1 to 5
 * @returns {String} A, B, C, D, E, F or NaN. Where A = 5, B = 4, C = 3, D = 2, E = 1 and F <= 1
 */
export function mapNumberToGrade(number) {
  if (typeof number !== 'number') return 'NaN';
  if (number > 4) return 'A';
  if (number > 3 && number <= 4) return 'B';
  if (number > 2 && number <= 3) return 'C';
  if (number > 1 && number <= 2) return 'D';
  if (number >= 1) return 'E';
  return 'F';
}
