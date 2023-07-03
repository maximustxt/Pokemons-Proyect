//--------------------------------------------Pokemon Api:
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

//---------------------------------------------Pokemon DB

export interface DetailPockemonDB {
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
  Types: [{ name: string }];
}

export interface types {
  id: number;
  name: string;
}

//----------------------------------------User LocalStorage:
export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

//--------------------------------------------User Registro:

export interface UserRegistro {
  name: string;
  email: string;
  password: string;
}

//---------------------------------------------Filtros Types:

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

//------------------------------------Abilities:

export interface AbilitiesPokemon {
  id: number;
  name: string;
}

//--------------------------------------Interface Cloudinary:

export interface Cloudinary {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: Date;
  tags: any[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  folder: string;
  access_mode: string;
  original_filename: string;
}

//----------------------------------------------------Interface crear pokemon:
export interface PkemonCrear {
  name: string;
  sprites: Sprites;
  abilities: Ability[];
  stats: Stat[];
  height: string;
  weight: string;
  species: Species;
  types: number[];
}

export interface Ability {
  ability: Species;
}

export interface Species {
  name: string;
}

export interface Sprites {
  back_default: string;
  front_default: string;
  back_shiny: string;
  front_shiny: string;
  other: Other;
}

export interface Other {
  dream_world: DreamWorld;
}

export interface DreamWorld {
  front_default: string;
}

export interface Stat {
  base_stat: number;
  stat: Species;
}

//-------------------Interface de PokemonPost:

export interface Pokemon {
  name: string;
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
  abilities: { ability: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  height: string;
  weight: string;
  species: { name: string };
  types: number[];
}

//-------------------------------------------------- Types PokemonDB:
export interface TypesPokemonDB {
  name: string;
}

//------------------------------------------------- Types Pokemon Api:
export interface TypesPokemonApi {
  type: { name: string };
}
