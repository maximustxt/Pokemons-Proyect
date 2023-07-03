require("dotenv").config(); // Carga las variables de entorno desde el archivo .env !IMPORTANTE!: SIEMPRE EL DOTENV VA ARRIBA DE TODO , PORQUE SINO , NO VA A FUNCIONAR
import express, { Application, Request, Response, NextFunction } from "express";
import { error } from "./Interface/InterfaceAll";
import morgan from "morgan";
import Usuario from "./Routes/Users-Rutas/Router.User";
import Pokemons from "./Routes/Pokemons-Rutas/Router.Pokemons";
import PokemonsFavoritos from "./Routes/Favoritos-Rutas/Router.Favoritos";
import Filtros from "./Routes/Filtros-Rutas/Router-Filtros";
import cors from "cors";
import Types from "./Routes/Types-Rutas/Router.Types";
import Abilities from "./Routes/Abilities-Rutas/Router.Abilities";
const bodyParser = require("body-parser");

const server: Application = express();

//Politicas de privacidad:
server.use(cors()); // Aumenta el límite a 50 megabytes (puedes ajustarlo según tus necesidades)
server.use(bodyParser.json({ limit: "5mb" })); // Aumenta el límite a 5 megabytes (puedes ajustarlo según tus necesidades)

//milldwares
server.use(express.json());
server.use(morgan("dev"));

//milwares para los errores :
server.use((err: error, req: Request, res: Response, next: NextFunction) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

//Rutas:
server.use("/Pokemon", Pokemons);
server.use("/User", Usuario);
server.use("/Types", Types);
server.use("/Favoritos", PokemonsFavoritos);
server.use("/Filtros", Filtros);
server.use("/Abilities", Abilities);

export default server;
