// import { sequelize } from "../DB";
import User from "../../models/Modelos-User-Favoritos/UsuarioTabla";
import { Users } from "../../Interface/InterfaceAll";

const PostUserController = async (usuario: Users) => {
  const { name, password, email } = usuario;
  try {
    const UsuarioEncontrado = await User.findOne({
      where: { email, password, name },
    });
    if (!UsuarioEncontrado) {
      await User.create({
        name,
        password,
        email,
      }); // aca lo que hace es filtrar y buscar un usuario que coincida con el email y password pasados por parametro , si no coinciden entonces debo tirar un error...

      const response = await User.findAll();

      return response;
    } else {
      throw new Error("Usuario ya creado");
    }
  } catch (error: any) {
    throw Error(`${error}`);
  }
};

export default PostUserController;
