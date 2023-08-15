const axios = require("axios");
const { Recipe, Diet } = require("../db");
const { API_KEY } = process.env;
const { Op, URL_CS } = require("sequelize");

const URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`;

const cleanArray = (arr) => {
  return arr.map((elemento) => {
    return {
      id: elemento.id,
      title: elemento.title,
      image: elemento.image,
      Diet: elemento.diets.map((dieta) => {
        return { name: dieta };
      }),
      summary: elemento.summary,
      healthScore: elemento.healthScore,
      stepbystep: elemento.analyzedInstructions,
      created: false,
    };
  });
};
 /* la funcion createInDB, en el readme en la parte del front recién dice que no 
 se puede guardar la receta en la base de datos */
// const createInDB = async (recetaId) =>{
//   let newReceta = await Recipe.create({
//     id: recetaId.id,
//     title: recetaId.title,
//     summary: recetaId.summary,
//     healthScore: recetaId.healthScore,
//     stepbystep: recetaId.stepbystep,
//     image: recetaId.image,
//     createIndb: true
//   })
// }
const getRecipesById = async (id) => {
  const recetaId = await Recipe.findByPk(id, {
    include: [{ model: Diet, through: { attributes: [] } }],
  });
  if (recetaId) return recetaId;

  try {
    // console.log("esta entrando en el primer axios" + id);

    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
    );
    console.log("este es el primer response" + response.data.title);
    const recetaId = {
      id: response.data.id,
      title: response.data.title,
      image: response.data.image,
      summary: response.data.summary,
      healthScore: response.data.healthScore,
      stepbystep: response.data.analyzedInstructions[0].steps,
      Diet: response.data.diets,
      created: false,
    };
    // createInDB(recetaId)
    // console.log(recetaId);
    return recetaId;
  } catch (error) {
    try {
      console.log("esta entrando en el segundo axios" + error);
      const response = await axios.get(
        "https://ajoaquinlizarraga.github.io/Food-API-mine/myApi/data/foodComplexSearch.json"
      );
      console.log(
        response.data.results.find((elemento) => elemento.id === +id)
      );
      const elementoEncontrado = await response.data.results.find(
        (elemento) => elemento.id === +id
      );
      console.log(elementoEncontrado);
      const recetaId = {
        id: elementoEncontrado.id,
        title: elementoEncontrado.title,
        image: elementoEncontrado.image,
        summary: elementoEncontrado.summary,
        healthScore: elementoEncontrado.healthScore,
        stepbystep: elementoEncontrado.analyzedInstructions[0].steps,
        Diet: elementoEncontrado.diets,
        created: false,
      };
      // createInDB(recetaId)
      console.log(recetaId);
      return recetaId;
    } catch (error) {
      return { error: `No existe la receta con ID: ${id}` };
    }
  }
};

const getRecipesByName = async (name) => {
  const DBRecipes = await Recipe.findAll({
    where: { title: { [Op.iLike]: `%${name}%` } },
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  // console.log("esto es es log de DBRecipes" + DBRecipes);

  const apiRecipe = (
    await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&titleMatch=${name}&number=100&addRecipeInformation=true`
    )
  );
      // console.log(apiRecipe.data.results);
  const newApi = cleanArray(apiRecipe.data.results);
  // console.log(newApi);
  const filteredApi = newApi.filter(
    (recipe) =>
    recipe.title && recipe.title.toLowerCase().includes(name.toLowerCase())
    );
    console.log(filteredApi);

  return [...DBRecipes, ...filteredApi];
};

const getAllRecipes = async () => {
  try {
    const DBRecipes = await Recipe.findAll({
      include: {
        model: Diet,
        through: "diet_type",
      },
    });
    console.log(DBRecipes);
    const DBRecipesWDiets = DBRecipes.map((recipe) => {
      const { Diet, ...rest } = recipe.toJSON();
      return {
        ...rest,
        Diet: Diet.map((diet) => {
          return { name: diet.name };
        }),
      };
    });
    console.log(DBRecipesWDiets);
    const APIRecipes = await axios.get(URL);
    const cleanedAPIRecipes = cleanArray(APIRecipes.data.results);

    return [...DBRecipesWDiets, ...cleanedAPIRecipes];
  } catch (error) {
    console.error("Error al obtener las recetas:", error);
    throw error;
  }
};

module.exports = {
  getRecipesById,
  getRecipesByName,
  getAllRecipes,
};
