import Favorito from "../../models/Modelos-User-Favoritos/FavoritoTable"; // es la tabla favorito.
import User from "../../models/Modelos-User-Favoritos/UsuarioTabla"; // es la tabla User
import { DetailPockemon } from "../../Interface/InterfaceAll";

const DeleteFavoritosController = async (
  id: number | string,
  idUser: number
) => {
  // Expresión regular para verificar UUID
  const uuidPattern =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

  try {
    if (typeof id === "string" && uuidPattern.test(id)) {
      const favoritoEliminar: Favorito | null = await Favorito.findByPk(id);
      const user = await User.findByPk(idUser);

      if (!user) {
        throw new Error("El usuario especificado no existe");
      }

      if (favoritoEliminar && typeof favoritoEliminar !== null) {
        await user.removeFavorito(favoritoEliminar); // seria el favorito que voy a eliminar del usurario...

        await favoritoEliminar.destroy();

        const Response = await Favorito.findAll();

        return Response;
      }
    } else {
      const favoritoEliminar: Favorito | null = await Favorito.findByPk(id);
      const user = await User.findByPk(idUser);

      if (!user) {
        throw new Error("El usuario especificado no existe");
      }

      if (favoritoEliminar && typeof favoritoEliminar !== null) {
        await user.removeFavorito(favoritoEliminar); // seria el favorito que voy a eliminar del usurario...

        await favoritoEliminar.destroy();

        const Response = await Favorito.findAll();

        console.log(Response);
        //hola
        return Response;
      }
    }
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export default DeleteFavoritosController;
