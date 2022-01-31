const fetchDrinksCategories = async () => {
  const RETURNED_OBJ = {
    data: [],
    error: '',
  };

  try {
    const request = await fetch(
      'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
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

export default fetchDrinksCategories;
