/**
   * Get user email located in localStorage
   * @function getUserEmailFromLocalStorage
   * @param { void } - no parameters required
   * @returns { string } - user email
   */
export const getUserEmailFromLocalStorage = () => {
  if (!JSON.parse(localStorage.getItem('user'))) {
    localStorage.setItem('user', JSON.stringify({ email: '' }));
    return JSON.parse(localStorage.getItem('user'));
  }
  return JSON.parse(localStorage.getItem('user')).email;
};

/**
 * Removes the user-related keys from localstorage
 * @function removeLocalStorageKeys
 * @param { Array } arrayOfKeys - A array of stings
 * @return {void} - returns nothing
 */

export const removeLocalStorageKeys = (arrayOfKeys) => {
  arrayOfKeys.forEach((key) => localStorage.removeItem(key));
};
