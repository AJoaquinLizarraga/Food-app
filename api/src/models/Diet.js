const { DataTypes } = require("sequelize");

module.exports = (database) => {
  database.define("diet", {
    /**id del plato en la db*/
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    /**nombre de la dieta*/
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
