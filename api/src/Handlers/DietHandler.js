const { Diet } = require("../db");
const { getApiDiets } = require("../controllers/DietController");

const getDietsHandler = async (req, res) => {
  try {
    const diets = await Diet.findAll();
    if (diets.length === 0) {
      await getApiDiets();
    }
    const dbDiets = await Diet.findAll();
    res.status(200).json(dbDiets);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getDietsHandler,
};
