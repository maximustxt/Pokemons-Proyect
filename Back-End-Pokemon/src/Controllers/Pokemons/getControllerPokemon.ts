import axios, { AxiosResponse } from "axios";

import {
  PokemonsAll,
  PokemonDB,
  DetailPockemon,
} from "../../Interface/InterfaceAll";
import {
  Pokemon,
  Type,
  Abilitie,
} from "../../models/Modelos-Pokemon-Type/Tablas-Pokemon-Types";

const URL_BASE: string = process.env.URL_BASE || "";

const GetPokemonController = async (): Promise<
  (PokemonsAll | PokemonDB | Pokemon)[]
> => {
  try {
    const ArrayTypes = <any>[];
    const ArrayHabilidades: any[] = [];
    const responsePokemon: (PokemonsAll | PokemonDB)[] = []; // response pokemons debo pasarle tambien los pokemons que cree.
    const promises: Promise<AxiosResponse<DetailPockemon>>[] = [];
    for (let i = 1; i < 31; i++) {
      promises.push(axios.get(`${URL_BASE}/${i}`)); // guardamos en un array todas las promesas y peticiones hechas.
    }

    const responses = await Promise.all(promises); // metodo Promise.all resuelve todas las promesas y permite que no haya un mal rendimiento de carga.
    responses.forEach((response) => {
      ArrayHabilidades.push(...response.data.abilities);
      ArrayTypes.push(...response.data.types);
      responsePokemon.push(response.data);
    });

    //-------------------------------------------Tabla Types:

    let ArrayDeLosTypes: string[] = [];

    for (let i = 0; i < ArrayTypes.length; i++) {
      if (!ArrayDeLosTypes.includes(ArrayTypes[i].type.name))
        ArrayDeLosTypes.push(ArrayTypes[i].type.name);
    } // agregamos a un array los typos para que no se repitan.

    ArrayDeLosTypes.forEach((Element) => {
      // seteo los typos en la tabla Types

      Element = Element.trimStart().trimStart();
      Type.findOrCreate({ where: { name: Element } });
    });

    //-------------------------------------------Tabla Abilities:

    let ArrayAbilities: string[] = [];

    for (let i = 0; i < ArrayHabilidades.length; i++) {
      if (!ArrayAbilities.includes(ArrayHabilidades[i].ability.name))
        ArrayAbilities.push(ArrayHabilidades[i].ability.name);
    } // agregamos a un array los typos para que no se repitan.

    ArrayAbilities.forEach((Element) => {
      // seteo los typos en la tabla Types
      console.log(Element);

      Element = Element.trimStart().trimStart();
      Abilitie.findOrCreate({ where: { name: Element } });
    });

    //*-------------------------ACA VA A IR LA LOGICA DE LOS POKEMONS CREADOS:

    const pokemonsCreados = await Pokemon.findAll({
      include: {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: [], //lo que decimos es que de la tabla intermedia no quiero nungun atributo de la misma , el array vacio ===> hace referencia a nada..
        },
      },
    }); // debo reccorer cada uno y obtener las propiedades basicas para home.

    //console.log(pokemonsCreados);

    if (pokemonsCreados.length) {
      return [...responsePokemon, ...(pokemonsCreados as Pokemon[])];
    } else {
      return [...responsePokemon];
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default GetPokemonController;
