require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_DEPLOY } = process.env;
// const recetasModel = require('./models/Recipe')
// const dietasModel = require('./models/Diet')
// const database = new Sequelize(
//   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
//   {
//     logging: false, // set to console.log to see the raw SQL queries// para que no muestre toda la query en la consola
//     native: false, // lets Sequelize know we can use pg-native for ~30% more speed
//   }
// );
const database = new Sequelize(DB_DEPLOY,
  {
    logging: false, // set to console.log to see the raw SQL queries// para que no muestre toda la query en la consola
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);
const basename = path.basename(__filename);

// recetasModel(database)
// dietasModel(database)

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (database) a todos los modelos
modelDefiners.forEach((model) => model(database));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(database.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
database.models = Object.fromEntries(capsEntries);

// En database.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

const { Recipe, Diet, SimilarRecipe } = database.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Recipe.belongsToMany(Diet, { through: "diet_type" });
Diet.belongsToMany(Recipe, { through: "diet_type" });
// SimilarRecipe.belongsToMany(Diet, { through: 'diet_type'})

module.exports = {
  ...database.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: database, // para importar la conexión { conn } = require('./db.js');
};
