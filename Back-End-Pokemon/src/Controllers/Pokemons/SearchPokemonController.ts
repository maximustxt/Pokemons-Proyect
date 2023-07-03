import axios from "axios";
import { PokemonsAll } from "../../Interface/InterfaceAll";
import GetPokemonController from "./getControllerPokemon";
import { Op } from "sequelize";
import {
  Pokemon,
  Type,
} from "../../models/Modelos-Pokemon-Type/Tablas-Pokemon-Types";

const SearchPokemonController = async (NamePokemon: string) => {
  // const URL_BASE: string = process.env.URL_BASE || "";

  const result = await Pokemon.findAll({
    where: {
      name: {
        [Op.like]: `%${NamePokemon}`,
      },
    },

    // aparte de filtrar pot nombre debo traer la tabla  de temperaments y unirla para cada perro... porque sino no se va a mostrar el temperamneto en la pagina..
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [], //lo que decimos es que de la tabla intermedia no quiero nungun atributo de la misma , el array vacio ===> hace referencia a nada..
      },
    },
  });
  if (result.length !== 0) {
    return result;
  } else {
    const responseApi = await GetPokemonController();
    const PokemonEncontrado = responseApi.filter(
      (dog) => dog.name === NamePokemon || dog.name.includes(NamePokemon) // o sino directamente que devuelva en minuscula...
    ); // transformo directamente la palabra de la api en minusculas como tambien en lo que recibo por query..
    if (PokemonEncontrado.length !== 0) {
      return PokemonEncontrado; // retorno el array que contenga los que estan asociados al nombre o lo incluyan..
    } else {
      throw Error("🛑 No se encontró El Pokemon!!!");
    }
  }

  // debo fijarme si el pokemon existe en la api , si no existe buscarlo en la base de datos y si no existe ni en la base de datos como en la api tirar error de Pokemon no encontrado!.
};

export default SearchPokemonController;
