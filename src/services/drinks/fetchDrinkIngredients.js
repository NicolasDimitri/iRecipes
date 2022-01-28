const fetchDrinkIngredients = async (ingredientName) => {
  const RETURNED_OBJ = {
    data: [],
    erro: '',
  };

  try {
    const request = await fetch(
      `www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredientName}`,
    );
    const response = await request.json();

    return {
      ...RETURNED_OBJ,
      data: response.drinks,
    };
  } catch (err) {
    return {
      ...RETURNED_OBJ,
      error: err,
    };
  }
};

export default fetchDrinkIngredients;
