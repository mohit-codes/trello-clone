/**
 * returns true if the password is valid else false
 * password must be between 8 and 32 characters long and must contain at least one upper case letter, one lower case letter and one number
 * @param {string} password
 * @returns {boolean}
 */
export function validatePassword(password) {
  return /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/.test(password);
}
