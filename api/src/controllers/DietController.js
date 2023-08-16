const axios = require("axios");
const { Diet } = require("../db");
const { API_KEY2 } = process.env;

const getApiDiets = async () => {
  try {
    
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY2}&number=100&addRecipeInformation=true`
      );
      const results = response.data.results;
      const dietsData = results.flatMap((recipe) => recipe.diets);
      
      const uniqueDiets = [...new Set(dietsData)];
      
      const transformedData = uniqueDiets.map((diet) => ({
        name: diet,
      }));
      
      Diet.bulkCreate(transformedData);
      // console.log('primer try');
  } catch (error) {
    try {
      // console.log('segundo try');
      const response = await axios.get(
        `https://ajoaquinlizarraga.github.io/Food-API-mine/myApi/data/foodComplexSearch.json`
      );
      const results = response.data.results;
      const dietsData = results.flatMap((recipe) => recipe.diets);
      const uniqueDiets = [...new Set(dietsData)];
      
      const transformedData = uniqueDiets.map((diet) => ({
        name: diet,
      }));
      
      console.log(transformedData);
      Diet.bulkCreate(transformedData);
      
    } catch (error) {
      throw error("Error obteniendo las dietas de la API:", error);
    }
  }
};

module.exports = {
  getApiDiets,
};
