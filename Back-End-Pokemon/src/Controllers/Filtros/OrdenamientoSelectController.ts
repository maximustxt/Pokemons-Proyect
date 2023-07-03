import { PokemonsAll, PokemonDB } from "../../Interface/InterfaceAll";
import { Pokemon } from "../../models/Modelos-Pokemon-Type/Tablas-Pokemon-Types";
import GetPokemonController from "../Pokemons/getControllerPokemon";

const OrdenamientoSelectController = async (nombreOrdenamiento: string) => {
  const ArrayPokemon: (PokemonsAll | PokemonDB | Pokemon)[] =
    await GetPokemonController();

  switch (nombreOrdenamiento) {
    case "Número Inferior":
      return [
        ...ArrayPokemon.sort(
          (
            a: PokemonsAll | PokemonDB | Pokemon,
            b: PokemonsAll | PokemonDB | Pokemon
          ) => {
            const aId =
              typeof a.id === "number" ? a.id : ArrayPokemon.length * 1;
            const bId =
              typeof b.id === "number" ? b.id : ArrayPokemon.length * 1;

            return aId - bId;
          }
        ),
      ];

    case "Número Superior":
      return [
        ...ArrayPokemon.sort((a, b) => {
          const aId = typeof a.id === "number" ? a.id : ArrayPokemon.length + 1;
          const bId = typeof b.id === "number" ? b.id : ArrayPokemon.length + 1;

          return bId - aId;
        }),
      ];
    case "A-Z":
      return [...ArrayPokemon.sort((a, b) => a.name.localeCompare(b.name))];
    case "Z-A":
      return [...ArrayPokemon.sort((a, b) => b.name.localeCompare(a.name))];
    default:
      return;
  }
};

export default OrdenamientoSelectController;
