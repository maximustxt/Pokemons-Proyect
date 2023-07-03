import axios from "axios";
import { DetailPockemon, PokemonDB } from "../../Interface/InterfaceAll";
import {
  Pokemon,
  Type,
} from "../../models/Modelos-Pokemon-Type/Tablas-Pokemon-Types";

const URL_BASE: string = process.env.URL_BASE || "";

const GetDetailPokemon = async (
  id: string | number
): Promise<DetailPockemon | PokemonDB | Pokemon | undefined> => {
  try {
    if (typeof id === "number") {
      const Response = await axios.get(`${URL_BASE}/${id}`);
      return Response.data;
    } else {
      const Response = await Pokemon.findByPk(id, {
        include: [
          {
            model: Type,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
        ],
      });

      if (Response) {
        return Response;
      } else {
        return;
      }
    }
  } catch (error) {
    throw Error(`Hubo un error : ${error}`);
  }
};

export default GetDetailPokemon;
