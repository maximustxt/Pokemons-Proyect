import { Filtros } from "../../Interface/InterfaceAll";
import GetPokemonController from "../Pokemons/getControllerPokemon";
import { Pokemon } from "../../models/Modelos-Pokemon-Type/Tablas-Pokemon-Types";
import { PokemonDB, PokemonsAll } from "../../Interface/InterfaceAll";

const FiltrosTyposController = async (Ordenamiento: string[]) => {
  let arrayPokemons = await GetPokemonController();

  if (Ordenamiento.length) {
    // Filtrar los Pokémon según los tipos seleccionados
    arrayPokemons = arrayPokemons.filter(
      (pokemon: any) =>
        typeof pokemon.id === "number"
          ? pokemon.types.some((type: { type: { name: string } }) =>
              Ordenamiento.includes(type.type.name)
            )
          : pokemon.Types.some((type: { name: string }) =>
              Ordenamiento.includes(type.name)
            ) // por cada pokemon preguntamos si el array que estoy enviando para filtrar contiene este pokemon esos tipos del array , que me los filtre..
    );

    return arrayPokemons;
  } else {
    return arrayPokemons;
  }
};

/*
En este código, utilizamos Object.values(Ordenamiento) para obtener un arreglo con los valores de los tipos seleccionados. Luego, filtramos ese arreglo para obtener solo los tipos con una longitud mayor a cero. Si hay tipos seleccionados, realizamos el filtrado en base a esos tipos utilizando el método Array.prototype.some() para verificar si el nombre del tipo de cada Pokémon coincide con alguno de los tipos seleccionados.

De esta manera, el filtrado debería funcionar correctamente con múltiples tipos seleccionados.

Asegúrate de actualizar tu controlador FiltrosTyposController con este código y prueba nuevamente. Si sigues experimentando problemas, por favor, proporciona más detalles o el código actualizado para que pueda ayudarte mejor.
*/
export default FiltrosTyposController;
