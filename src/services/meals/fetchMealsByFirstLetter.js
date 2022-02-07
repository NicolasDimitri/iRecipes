const fetchMealsByFirstLetter = async (letter) => {
  const RETURNED_OBJ = {
    data: [],
    error: '',
  };

  try {
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
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

export default fetchMealsByFirstLetter;
