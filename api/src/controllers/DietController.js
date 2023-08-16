const axios = require("axios");
const { Diet } = require("../db");
const { API_KEY2 } = process.env;

const getApiDiets = async () => {

    /* AQUI SE HACE LA PETICION PRIMARIA */
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
      
  } catch (error) {
    /* AQUI SE HACE LA PETICION DE RESPALDO */
    try {
      const response = await axios.get(
        `https://ajoaquinlizarraga.github.io/Food-API-mine/myApi/data/foodComplexSearch.json`
      );
      const results = response.data.results;
      /* flatMap devuelve un array plano de en este caso de los valores de recipe.diets */
      const dietsData = results.flatMap((recipe) => recipe.diets);
      /* ...new Set() almacena valores unicos en una matriz/array */
      const uniqueDiets = [...new Set(dietsData)];
      
      const transformedData = uniqueDiets.map((diet) => ({
        name: diet,
      }));
      
      /* bulkCreate para insertar los valores en la BD */
      Diet.bulkCreate(transformedData);
      
    } catch (error) {
      throw error("Error obteniendo las dietas de la API:", error);
    }
  }
};

module.exports = {
  getApiDiets,
};
