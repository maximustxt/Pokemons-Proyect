import {
  Pokemon,
  Type,
} from "../../models/Modelos-Pokemon-Type/Tablas-Pokemon-Types";
import User from "../../models/Modelos-User-Favoritos/UsuarioTabla";
// import {PokemonCreado} from "../../Interface/InterfaceAll"

const PostControllerPokemon = async (
  PokemonCreado: {
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
  },
  idUser: number
) => {
  try {
    const { name, types } = PokemonCreado;

    const user = await User.findByPk(idUser);
    if (!user) {
      throw new Error("Debes Iniciar Sesion.");
    }

    let pokemon = await Pokemon.findOne({
      where: {
        name,
      },
    });

    if (!pokemon) {
      // Crear el nuevo Pokémon
      const pokemonCreado = await Pokemon.create(PokemonCreado);

      // Verificar y asociar los tipos al Pokémon creado

      await pokemonCreado.addType(types);

      const pokemonCreadoDB: any = await Pokemon.findOne({
        where: { id: pokemonCreado.id },
        include: {
          model: Type,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });

      // Comprobar si el Pokémon ya está en favoritos del usuario
      const hasFavorite = await user.hasPokemon(pokemonCreadoDB);
      if (hasFavorite) {
        throw new Error("El personaje ya está agregado a favoritos.");
      } else {
        await user.addPokemon(pokemonCreadoDB);
        return pokemonCreadoDB;
      }
    } else {
      throw new Error("Pokemon ya creado");
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default PostControllerPokemon;
