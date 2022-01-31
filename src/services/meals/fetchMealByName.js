const fetchMealByName = async (name) => {
  const RETURNED_OBJ = {
    data: [],
    error: '',
  };

  try {
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    const response = await request.json();
    return {
      ...RETURNED_OBJ,
      data: response.meals,
    };
  } catch (err) {
    return {
      ...RETURNED_OBJ,
      error: err,
    };
  }
};

export default fetchMealByName;
