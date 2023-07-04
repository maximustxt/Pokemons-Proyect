import { Sequelize } from "sequelize-typescript";
require("dotenv").config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DIALECT, BDD, DB_DEPLOY } =
  process.env;

// Comprueba si DB_DEPLOY está definido y úsalo en consecuencia
const databaseURL = DB_DEPLOY
  ? DB_DEPLOY
  : "postgres://db_pokemons_xmjt_user:1w0NnFMuSiWQJj9vPM6u0m9w6BvmhvkN@dpg-cii2l22ip7vpelpogs6g-a.oregon-postgres.render.com/db_pokemons_xmjt "; // Puedes proporcionar un valor predeterminado en caso de que DB_DEPLOY sea undefined

// Configura las opciones de conexión a la base de datos
const dbOptions = {
  host: DB_HOST,
  port: 5432, // Convierte el puerto a un número
  dialect: DB_DIALECT,
  database: BDD,
  username: DB_USER,
  password: DB_PASSWORD,
};

// Configura las opciones adicionales para Sequelize
const sequelizeOptions = {
  dialectOptions: {
    ssl: {
      require: true,
    },
  },
  // Define la ruta a los archivos de los modelos
  models: [__dirname + "/models/*.ts"],
};

// Crea una instancia de Sequelize y pásale las opciones
export const sequelize = new Sequelize(databaseURL, sequelizeOptions);

// import { Sequelize } from "sequelize-typescript";
// require("dotenv").config();

// const { DB_USER, DB_PASSWORD, DB_HOST, BDD, DB_DEPLOY } = process.env;

// export const sequelize = new Sequelize(DB_DEPLOY, {
//   host: DB_HOST,
//   dialect: "postgres",
//   database: BDD,
//   username: DB_USER,
//   password: DB_PASSWORD,
//   port: 5432, // Puerto por defecto de PostgreSQL
//   models: [__dirname + "/models/*.ts"], // Ruta a los archivos de los modelos (ME FALTABA ESTO , PARA QUE SE BUSQUEN LOS MODELOS Y PÓDER INTERACTUAR CON LOS MISMOS.)
// });
