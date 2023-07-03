// import { sequelize } from "../DB";
import User from "../../models/Modelos-User-Favoritos/UsuarioTabla";
import { UserSesion } from "../../Interface/InterfaceAll";

const PostUserInicioSesionControllers = async (userSesion: UserSesion) => {
  const { password, email } = userSesion;
  try {
    const UsuarioEncontrado = await User.findOne({
      where: {
        password,
        email,
      },
    }); // aca lo que hace es filtrar y buscar un usuario que coincida con el email y password pasados por parametro , si no coinciden entonces debo tirar un error...

    if (!UsuarioEncontrado) {
      throw Error("No se encontro ningun usuario con estas caracteristicas!");
    } else {
      return UsuarioEncontrado;
    }
  } catch (error: any) {
    throw Error(`${error}`);
  }
};

export default PostUserInicioSesionControllers;
