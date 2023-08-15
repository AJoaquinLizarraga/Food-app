const { Router } = require("express");
const {
  getRecipesHandler,
  getRecipesByIdHandler,
  postRecipesHandler,
} = require("../Handlers/RecipeHandler");
const recipesRouter = Router();

recipesRouter.get("/", getRecipesHandler);

recipesRouter.get("/:id", getRecipesByIdHandler);

recipesRouter.post("/", postRecipesHandler);

module.exports = recipesRouter;
