const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a database.
module.exports = (database) => {
  // defino el modelo
  database.define("recipe", {
    /**id del plato en la db*/
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    /**nombre del plato*/
    title: {
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
      allowNull: false,
    },
    /**paso a paso de la comida */
    stepbystep: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    createIndb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });
};
