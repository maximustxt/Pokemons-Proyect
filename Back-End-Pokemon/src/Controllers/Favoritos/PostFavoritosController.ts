import Favoritoz from "../../models/Modelos-User-Favoritos/FavoritoTable";
import User from "../../models/Modelos-User-Favoritos/UsuarioTabla";
import { FavoritosDB } from "../../Interface/InterfaceAll";

const PostFavoritosController = async (
  favoritoPokemon: Favoritoz | FavoritosDB,
  idUser: number
) => {
  const userX = await User.findByPk(idUser);
  if (!userX) {
    throw new Error("Debes Iniciar Sesion.");
  }

  const { id } = favoritoPokemon;
  // Expresión regular para verificar UUID
  const uuidPattern =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

  // Verificar si idUser es un UUID válido

  if (typeof id === "string" && uuidPattern.test(id)) {
    const { Types, name, sprites } = favoritoPokemon as FavoritosDB;

    const Array = Types.map((e) => {
      return {
        type: {
          name: e.name,
        },
      };
    });

    const types: { type: { name: string } }[] = Array;
    let character = await Favoritoz.findOne({
      where: {
        id: id,
      },
    });

    if (!character) {
      character = await Favoritoz.create({
        id: id,
        name,
        sprites,
        types,
      });
    }

    const hasFavorite = await userX.hasFavorito(character); // esto devuelve true o flase , pregunta si se encuentra.
    if (hasFavorite) {
      // si se encontro tiramos un error diciendo que ya existe ese favorito.
      throw new Error("El personaje ya esta agregado a favoritos.");
    }

    await userX.addFavorito(character);

    return character;
  } else {
    const { types, name, sprites } = favoritoPokemon as Favoritoz;

    let character = await Favoritoz.findOne({
      where: {
        id: id.toString(),
      },
    });

    if (!character) {
      character = await Favoritoz.create({
        id: id.toString(),
        name,
        sprites,
        types,
      });
    }

    const hasFavorite = await userX.hasFavorito(character); // esto devuelve true o flase , pregunta si se encuentra.
    if (hasFavorite) {
      // si se encontro tiramos un error diciendo que ya existe ese favorito.
      throw new Error("El personaje ya esta agregado a favoritos.");
    }

    await userX.addFavorito(character);

    return character;
  }
};

export default PostFavoritosController;
