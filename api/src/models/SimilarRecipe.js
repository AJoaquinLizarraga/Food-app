const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a database.
module.exports = (database) => {
  // defino el modelo
  database.define('similarRecipe', {
    /**id del plato en la db*/
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    /**nombre del plato*/
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    /**resumen del plato */
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    /**que tan saludable es del 0 a 100 */
    healthScore: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 100,
      },
      allowNull: false
    },
    /**paso a paso de la comida */
    stepbyStep: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    createIndb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  })
}