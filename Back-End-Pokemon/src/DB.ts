import { Sequelize } from "sequelize-typescript";
require("dotenv").config();

const { DB_USER, DB_PASSWORD, DB_HOST, BDD } = process.env;

export const sequelize = new Sequelize({
  host: DB_HOST,
  dialect: "postgres",
  database: BDD,
  username: DB_USER,
  password: DB_PASSWORD,
  port: 5432, // Puerto por defecto de PostgreSQL
  models: [__dirname + "/models/*.ts"], // Ruta a los archivos de los modelos (ME FALTABA ESTO , PARA QUE SE BUSQUEN LOS MODELOS Y PÓDER INTERACTUAR CON LOS MISMOS.)
});
