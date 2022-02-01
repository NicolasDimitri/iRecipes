const fetchMealsNacionality = async () => {
  const RETURNED_OBJ = {
    data: [],
    error: '',
  };

  try {
    const request = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
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

export default fetchMealsNacionality;
