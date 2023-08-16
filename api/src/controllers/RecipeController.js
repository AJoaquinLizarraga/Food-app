const axios = require("axios");
const { Recipe, Diet } = require("../db");
const { API_KEY2 } = process.env;
const { Op, URL_CS, UUID } = require("sequelize");

// const URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY2}&number=100&addRecipeInformation=true`;

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
  if(typeof id === UUID){

    const recetaId = await Recipe.findByPk(id, {
      include: [{ model: Diet, through: { attributes: [] } }],
    });
    if (recetaId) return recetaId;
  }

  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY2}`
    );
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
    return recetaId;
  } catch (error) {
    try {
      const response = await axios.get(
        "https://ajoaquinlizarraga.github.io/Food-API-mine/myApi/data/foodComplexSearch.json"
      );
      const elementoEncontrado = await response.data.results.find(
        (elemento) => elemento.id === +id
      );
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
  try {
    const apiRecipes = (
      await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY2}&titleMatch=${name}&number=100&addRecipeInformation=true`
      )
    );
  
    const newApi = cleanArray(apiRecipes.data.results);
  
    const filteredApi = newApi.filter(
      (recipe) =>
      recipe.title && recipe.title.toLowerCase().includes(name.toLowerCase())
      );
    return [...DBRecipes, ...filteredApi];
    
  } catch (error) {
    try {
      const apiRecipes = (
        await axios.get(
          "https://ajoaquinlizarraga.github.io/Food-API-mine/myApi/data/foodComplexSearch.json"
        )
      );
    
      const newApi = cleanArray(apiRecipes.data.results);
    
      const filteredApi = newApi.filter(
        (recipe) =>
        recipe.title && recipe.title.toLowerCase().includes(name.toLowerCase())
        );
      return [...DBRecipes, ...filteredApi];
    } catch (error) {
      throw error('No APIs found')
    }
  }
};

const getAllRecipes = async () => {
  try {
    const DBRecipes = await Recipe.findAll({
      include: {
        model: Diet,
        through: "diet_type",
      },
    });
    // const DBRecipesWDiets = DBRecipes.map((recipe) => {
    //   const { Diet, ...rest } = recipe.toJSON();
    //   return {
    //     ...rest,
    //     Diet: Diet.map((diet) => {
    //       return { name: diet.name };
    //     }),
    //   };
    // });
    // const DBRecipes = await Recipe.findAll({
    //   attributes: { exclude: ['createdAt', 'updatedAt'] },
    //   include: [{
    //     model: Diet,
    //     attributes: ['name'],
    //     through: { attributes: [] },
    //     as: 'diet_type'
    //   }]
    // })
  
    const APIRecipes = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY2}&number=100&addRecipeInformation=true`);
    const cleanedAPIRecipes = cleanArray(APIRecipes.data.results);
    console.log(cleanedAPIRecipes)

    return [...DBRecipes, ...cleanedAPIRecipes];
  } catch (error) {
    try {
      const DBRecipes = await Recipe.findAll({
        include: {
          model: Diet,
          through: "diet_type",
        },
      });
      // const DBRecipesWDiets = DBRecipes.map((recipe) => {
      //   const { Diet, ...rest } = recipe.toJSON();
      //   return {
      //     ...rest,
      //     Diet: Diet.map((diet) => {
      //       return { name: diet.name };
      //     }),
      //   };
      // });
      // const DBRecipes = await Recipe.findAll({
      //   attributes: { exclude: ['createdAt', 'updatedAt'] },
      //   include: [{
      //     model: Diet,
      //     attributes: ['name'],
      //     through: { attributes: [] },
      //     as: 'diet_type'
      //   }]
      // })
      const APIRecipes = await axios.get('https://ajoaquinlizarraga.github.io/Food-API-mine/myApi/data/foodComplexSearch.json');
      const cleanedAPIRecipes = cleanArray(APIRecipes.data.results);

      return [...DBRecipes, ...cleanedAPIRecipes];
      
    } catch (error) {
      throw error("Error al obtener las recetas:", error);
    }
  }
};

module.exports = {
  getRecipesById,
  getRecipesByName,
  getAllRecipes,
};
