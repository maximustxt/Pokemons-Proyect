import User from "../../models/Modelos-User-Favoritos/UsuarioTabla";
import { FavoritosDB } from "../../Interface/InterfaceAll";
import Favorito from "../../models/Modelos-User-Favoritos/FavoritoTable";

const GetFavoritosController = async (idUser: number | string) => {
  try {
    const UsuarioEncontrado = await User.findByPk(idUser);

    if (UsuarioEncontrado) {
      const response: (Favorito | FavoritosDB)[] =
        await UsuarioEncontrado.getFavoritos({
          joinTableAttributes: [], // Excluir la tabla intermedia. Al proporcionar joinTableAttributes: [] como opción en getFavoritos(), se excluye la tabla intermedia de la respuesta y solo se obtendrán los favoritos asociados al usuario.
        });

      return response;
    } else {
      throw Error("Debes Iniciar Sesion!.");
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default GetFavoritosController;
