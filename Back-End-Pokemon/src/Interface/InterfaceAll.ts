import { Type } from "../models/Modelos-Pokemon-Type/Tablas-Pokemon-Types";

export interface PokemonsAll {
  name: string;
  id: number;
  sprites: {
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
  types: [{ type: { name: string } }];
}

//---------------------------------------------------------//

export interface FavoritosDB {
  name: string;
  id: string;
  sprites: {
    back_default: string;
    front_default: string;
    back_shiny: string;
    front_shiny: string;
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
  abilities: [{ ability: { name: string } }];
  stats: [{ base_stat: number; stat: { name: string } }]; // las habilidades
  height: string;
  weight: string;
  species: { name: string };
  Types: { name: string }[];
}

export interface PokemonDB {
  name: string;
  id: string;
  sprites: {
    back_default: string;
    front_default: string;
    back_shiny: string;
    front_shiny: string;
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
  abilities: [{ ability: { name: string } }];
  stats: [{ base_stat: number; stat: { name: string } }]; // las habilidades
  height: string;
  weight: string;
  species: { name: string };
  types: { type: { name: string } }[];
}

export interface DetailPockemon {
  name: string;
  id: number;
  sprites: {
    back_default: string;
    front_default: string;
    back_shiny: string;
    front_shiny: string;
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
  abilities: [{ ability: { name: string } }];
  stats: [{ base_stat: number; stat: { name: string } }]; // las habilidades
  height: string;
  weight: string;
  species: { name: string };
  types: [{ type: { name: string } }];
}

export interface Users {
  name: string;
  email: string;
  password: string;
}

export interface UserSesion {
  email: string;
  password: string;
}

export interface Favoritos {
  name: string;
  id: number | string;
  sprites: {
    back_default: string;
    front_default: string;
    back_shiny: string;
    front_shiny: string;
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
  types: [{ type: { name: string } }] | [{ name: string }];
}

export interface UserAttributes {
  id?: number;
  name: string;
  email: string;
  password: string;
}

export interface error {
  status: number;
  message: string;
}

export interface Filtros {
  grass: string;
  poison: string;
  fire: string;
  flying: string;
  water: string;
  bug: string;
  electric: string;
  ground: string;
  normal: string;
}

//------------------------------PokemonCreado :
export interface PokemonCreadoUser {
  name: string;
  id: string;
  sprites: {
    back_default: string;
    front_default: string;
    back_shiny: string;
    front_shiny: string;
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
  abilities: [{ ability: { name: string } }];
  stats: [{ base_stat: number; stat: { name: string } }]; // las habilidades
  height: string;
  weight: string;
  species: { name: string };
  types: Type[];
}
