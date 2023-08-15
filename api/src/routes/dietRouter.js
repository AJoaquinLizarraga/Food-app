const { Router } = require("express");
const { getDietsHandler } = require("../Handlers/DietHandler");
const dietsRouter = Router();

dietsRouter.get("/", getDietsHandler);

module.exports = dietsRouter;
