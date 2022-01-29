/**
 * Format the ingredients of recipes;
 * @function `formatIngredientsAPI`
 * @param { object } data - receive an recipes;
 * @returns { array } `array` with data formated [[ingredient, measure], ...];
 */
const formatIngredientsAPI = (data) => {
  const array = [];
  // Varre todos as chaves e valores do item 'food';
  Object.entries(data).filter((ingredient) => {
    // Verifica se a chave corresponde a strIngredient e se ela não é nula ou vazia;
    if (ingredient[0].includes('strIngredient') && !!ingredient[1]) {
      // Captura a medida dos ingredientes e salva em uma variável;
      const measure = ingredient[0].replace('Ingredient', 'Measure');
      // Adiciona no estado global as instruções;
      array.push([ingredient[1], data[measure]]);
    }
    return false;
  });
  return array; // Retorna a array global da função;
};

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

export const formatDataFromAPI = (data, isMeal) => {
  if (isMeal) {
    const ARRAY_MODEL = data.map((item) => {
      const ingredients = formatIngredientsAPI(item);
      const MODEL = {
        id: item.idMeal,
        title: item.strMeal,
        category: item.strCategory,
        location: item.strArea,
        intructions: item.strInstructions,
        ingredients,
        image: item.strMealThumb,
        tags: item.strTags,
        movie: item.strYoutube,
      };

      return MODEL;
    });
    return ARRAY_MODEL;
  }
};
