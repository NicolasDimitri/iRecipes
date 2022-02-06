/**
 * Get items from local storage already format or not;
 * @param { string } key
 * key to search in local storage;
 * @param { boolean } format
 * Initialized to true. Format before returning using `JSON.parse()` else return string;
 * @returns {(object|string|false)}
 * The return is directly affected by the parameters. If formatted, an `object` will be returned
 * otherwise a `string` will be returned and if the key does not exist, a `bolean false` will be returned;
 */
export const getLocalStorage = (key, format = true) => {
  if (format) return JSON.parse(localStorage.getItem(key)) || false;
  return localStorage.getItem(key) || false;
};

/**
 * Set value in key from local storage;
 * @param { string } key
 * String with name of key to set in local storage;
 * @param {(object|string)} value
 * String or Object to set in local storage;
 * @param { boolean } format
 * Initialized to true. Format before adding value using `JSON.stringfy()` otherwise only string value;
 * @return { void }
 * This function only update or add values in local storage;
 */
export const setLocalStorage = (key, value, format = true) => {
  if (format) localStorage.setItem(key, JSON.stringify(value));
  else localStorage.setItem(key, value);
};

/**
 * Verify if value exist in object;
 * @param { string } key
 * String with name of key to search in localstorage;
 * @param { Array.<string> } input
 * Array with all properties to reach inside object before defined by key;
 * @param { (string|number) } value
 * Value to compare when hitting target property inside object
 * @returns { boolean } Return true if exist into propertie or false if not exist;
 */
export const verifyLocalStorage = (key, input, value) => {
  if (!Array.isArray(input) || !getLocalStorage(key)) return false;
  let storage = getLocalStorage(key);
  let result = false;
  input.forEach((propertie) => {
    storage = storage[propertie];
    if (
      (Array.isArray(storage) || typeof storage === 'string')
      && storage.includes(value)
    ) result = true;
    if (typeof storage === 'object'
      && Object.prototype.hasOwnProperty.call(storage, value)) result = true;
  });
  return result;
};

/* ------------------------------------------------- */
/* ------------------------------------------------- */
/* ------------------------------------------------- */
/* ------------------------------------------------- */
/* ------------------------------------------------- */
/* ------------------------------------------------- */
export const verifyAlready = (object, id, value) => (
  Object.prototype.hasOwnProperty.call(object, id)
    && object[id].includes(value)
);

export const updateInProgress = (key, path, id, value) => {
  const storage = getLocalStorage(key);
  const property = path.includes('foods') ? 'meals' : 'cocktails';

  if (!verifyAlready(storage[property], id, value)) {
    storage[property][id].push(value);
    setLocalStorage(key, storage);
  } else {
    const index = storage[property][id].indexOf(value);
    storage[property][id].splice(index, 1);
    setLocalStorage(key, storage);
  }
  // if (!verifyAlready(storage[property], id, value)) {
  //   storage[property][id].push(value);
  //   setLocalStorage(key, storage);
  // } else {
  //   const index = storage[property][id].indexOf(value);
  //   storage[property][id].splice(index, 1);
  //   setLocalStorage(key, storage);
  // }
};
