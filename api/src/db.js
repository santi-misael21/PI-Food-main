require('dotenv').config();
const { Sequelize , Op} = require('sequelize');
const ModelRecipe = require ("./models/Recipe.js");// cambios importantes
const ModelDiet = require ("./models/DietType.js");// cambios importantes 
const ModelApidiet = require("./models/ApiDiets.js");// cambios importantes
const ModelStep = require("./models/Steps.js");// cambios importantes
const ModelDieta = require("./models/Diet1-n.js");

const fs = require('fs');
const path = require('path');
const { PassThrough } = require('stream');
const {
  DB_USER, DB_PASSWORD, DB_HOST
} = process.env;

let DB = DB_USER === 'postgres' ? 'spoondiets' : ''

// console.log(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/spoondiets`);

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB}`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  dialect: 'sqlite',    
  storage: 'database.sqlite'
});

ModelRecipe(sequelize); //agregado
ModelDiet(sequelize); //agregado  
ModelApidiet(sequelize); //agregado
ModelStep(sequelize); //agregado
ModelDieta(sequelize);

// console.log(sequelize);

// const db = new Sequelize('postgres://postgres:3571@localhost:5432/food', {
//   logging: false,
// });



// const basename = path.basename(__filename);

// const modelDefiners = [];

// // Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
// fs.readdirSync(path.join(__dirname, '/models'))
//   .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
//   .forEach((file) => {
//     modelDefiners.push(require(path.join(__dirname, '/models', file)));
//   });

// // Injectamos la conexion (sequelize) a todos los modelos
// modelDefiners.forEach(model => model(sequelize));
// // Capitalizamos los nombres de los modelos ie: produ         ct => Product
// let entries = Object.entries(sequelize.models);
// let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
// sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { recipe, apidiets, step, diet, dieta } = sequelize.models; //AGREGADO PERO AÚN NO USADO, CREO QUE SI COMENTO ANDA
// Aca vendrian las relaciones
// Product.hasMany(Reviews);
// console.log(sequelize.models)
recipe.belongsToMany(diet, {through: "recipe-diet"});
diet.belongsToMany(recipe, {through: "recipe-diet"});
recipe.hasMany(step);
step.belongsTo(recipe);

recipe.hasMany(dieta);
dieta.belongsTo(recipe);


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
  Op
};
