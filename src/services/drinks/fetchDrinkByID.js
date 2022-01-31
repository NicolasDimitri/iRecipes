const fetchDrinkByID = async (id) => {
  const RETURNED_OBJ = {
    data: [],
    error: '',
  };

  try {
    const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
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

export default fetchDrinkByID;
