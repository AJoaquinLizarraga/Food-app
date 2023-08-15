const {
  getRecipesById,
  getAllRecipes,
  getRecipesByName,
} = require("../controllers/RecipeController");
const { Recipe, Diet, diet_type } = require("../db");

const validate = (req, res, next) => {
  const { title, summary, healthScore, stepbystep, Diet, image } = req.body;
  if (!title || !summary || !healthScore || !stepbystep || !Diet || !image)
    res.status(400).json({ error: "Datos Requeridos" });
  next();
};
/** AQUI SE INGRESAN LAS RECETAS NUEVAS */
const postRecipesHandler = async (req, res) => {
  try {
    const { title, summary, healthScore, stepbystep, Diet, image } = req.body;
    const exists = await Recipe.findAll({ where: { title: title } });
    if (exists.length) {
      throw new Error("There is already a recetaId with this name");
    }

    const newRecipe = await Recipe.create({
      title,
      summary,
      healthScore,
      stepbystep,
      image,
      created: true,
    });

    const typeDietIds = Diet.split(",").map((id) => Number(id.trim()));
    newRecipe.addTypeDiets(typeDietIds);

    res.status(200).json(newRecipe);
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
};


/** AQUI SE PIDEN RECETAS POR ID POR PARAMS*/
const getRecipesByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const recetaId = await getRecipesById(id);
    console.log(recetaId);
    if (recetaId) res.status(200).json(recetaId);
    else res.status(200).json("No existe una receta con ese Id");
  } catch (error) {
    res
      .status(400)
      .json({ error: "La receta solicitada no existe" + error.message });
  }
};


/** AQUI SE PIDEN RECETAS POR NOMBRE POR QUERY*/
const getRecipesHandler = async (req, res) => {
  try {
    const { name } = req.query;
    const result = name ? await getRecipesByName(name) : await getAllRecipes();
    // console.log(result);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  validate,
  postRecipesHandler,
  getRecipesByIdHandler,
  getRecipesHandler,
};
