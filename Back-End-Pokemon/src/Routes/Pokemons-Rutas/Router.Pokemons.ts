import { Router, Request, Response } from "express";
import SearchPokemonController from "../../Controllers/Pokemons/SearchPokemonController";
import GetControllerPokemons from "../../Controllers/Pokemons/getControllerPokemon";
import GetDetailPokemon from "../../Controllers/Pokemons/GetDetailPokemon";
import PostControllerPokemon from "../../Controllers/Pokemons/PostControllerPokemon";
import getControllerPokemonsUser from "../../Controllers/Pokemons/getControllerPokemonsUser";
import { PokemonCreadoUser, error } from "../../Interface/InterfaceAll";
import { validate as validateUuid } from "uuid";

const Pokemons = Router();

//*---------------------------All Pokemons User------------------------------------*//

Pokemons.get("/UserPoke", async (req: Request, res: Response) => {
  try {
    const { idUser } = req.query;
    const respuesta = await getControllerPokemonsUser(Number(idUser));
    res.status(200).json(respuesta);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});
//*---------------------------All Pokemons------------------------------------*//

Pokemons.get("/", async (req: Request, res: Response) => {
  try {
    const respuesta = await GetControllerPokemons();
    res.status(200).json(respuesta);
  } catch (error: any) {
    res.status(500).json({ Error: error.message });
  }
});

//*--------------------------Detail Pokemons-------------------------------------*//

Pokemons.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (validateUuid(id)) {
      const respuesta = await GetDetailPokemon(id);
      res.status(200).json(respuesta);
    } else {
      const respuesta = await GetDetailPokemon(Number(id));
      res.status(200).json(respuesta);
    }
  } catch (error: any) {
    res.status(500).json({ Error: error.message });
  }
});

//*--------------------------Search Pokemon--------------------------------------*//

Pokemons.get("/search/:NamePokemon", async (req: Request, res: Response) => {
  const { NamePokemon } = req.params;
  try {
    const respuesta = await SearchPokemonController(NamePokemon);
    res.status(200).json(respuesta);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/*
 *  Al postear un pokemon envio el id del Usuario y creo ese pokemon con el id de ese usuario.
 *  Luego creo una ruta que es para traer los pokemons creados por el usuario (Get) , donde voy a mandar el id y recibire el array de pokemons.
 */

//*-----------------------------Post Pokemon-------------------------------------*//
Pokemons.post("/:idUser", async (req: Request, res: Response) => {
  try {
    const PokemonCreado: PokemonCreadoUser = req.body;
    const { idUser } = req.params;
    const { name, abilities, sprites, stats, height, weight, species, types } =
      PokemonCreado;

    if (
      !name.length ||
      !height ||
      !weight ||
      !abilities[0].ability.name.length ||
      !stats.length ||
      stats[0].base_stat === 0 ||
      !species.name.length ||
      !types.length ||
      !sprites.other.dream_world.front_default.length
    ) {
      throw new Error("Faltan Datos!.");
    } else {
      const respuesta = await PostControllerPokemon(
        PokemonCreado,
        Number(idUser)
      );
      res.status(200).json(respuesta);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default Pokemons;
