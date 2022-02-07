import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export const createNotification = (type) => {
  const TIME_DEFAULT = 3000;
  switch (type) {
  case 'copy':
    NotificationManager.success('Link copied!', '', TIME_DEFAULT);
    break;
  default:
    NotificationManager.info('Error: No info message');
  }
};

/**
 * Format the ingredients of recipes;
 * @function `formatIngredientsAPI`
 * @param { object } data - receive an recipes;
 * @returns { array } `array` with data formated [[ingredient, measure], ...];
 */
const formatIngredientsAPI = (data) => {
  const array = [];
  Object.entries(data).filter((ingredient) => {
    if (ingredient[0].includes('strIngredient') && !!ingredient[1]) {
      const measure = ingredient[0].replace('Ingredient', 'Measure');
      array.push([ingredient[1], data[measure]]);
    }
    return false;
  });
  return array;
};

/**
   * Get user email located in localStorage
   * @function getUserEmailFromLocalStorage
   * @param { void } - no parameters required
   * @returns { string } - user email
   */
export const getUserEmailFromLocalStorage = () => {
  if (!localStorage.getItem('user')) {
    localStorage.setItem('user', JSON.stringify({ email: '' }));
    return JSON.parse(localStorage.getItem('user')).email;
  }
  return JSON.parse(localStorage.getItem('user')).email;
};

/**
 * Removes the user-related keys from localstorage
 * @function removeLocalStorageKeys
 * @param { Array } arrayOfKeys - A array of strings
 * @return {void} - returns nothing
 */

export const removeLocalStorageKeys = (arrayOfKeys) => {
  arrayOfKeys.forEach((key) => localStorage.removeItem(key));
};

/**
 * Format the data;
 * @param { object } data - brute data;
 * @param { boolean } isMeal - true if date is from food;
 * @returns { Array.<object> } `Array` of objects;
 */
export const formatDataFromAPI = (data, isMeal) => {
  if (isMeal) {
    return data.map((item) => {
      const ingredients = formatIngredientsAPI(item);
      return {
        id: item.idMeal,
        title: item.strMeal,
        category: item.strCategory,
        location: item.strArea,
        intructions: item.strInstructions,
        ingredients,
        image: item.strMealThumb,
        tags: item.strTags,
        type: 'foods',
        movie: item.strYoutube ? item.strYoutube.split('=')[1] : '',
      };
    });
  }

  return data.map((item) => {
    const ingredients = formatIngredientsAPI(item);
    return {
      id: item.idDrink,
      title: item.strDrink,
      category: item.strCategory,
      intructions: item.strInstructions,
      ingredients,
      image: item.strDrinkThumb,
      tags: item.strTags,
      movie: item.strVideo,
      isAlcolic: item.strAlcoholic,
      glass: item.strGlass,
      type: 'drinks',
      iba: item.strIBA,
    };
  });
};
