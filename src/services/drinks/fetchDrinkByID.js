const fetchDrinkByID = async (id) => {
  const RETURNED_OBJ = {
    data: [],
    erro: '',
  };

  try {
    const request = await fetch(`www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
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
