import { Type } from "../../models/Modelos-Pokemon-Type/Tablas-Pokemon-Types";
import User from "../../models/Modelos-User-Favoritos/UsuarioTabla";

const getControllerPokemonsUser = async (idUser: number) => {
  try {
    //de este usuario debo buscar todos los pokemons:
    const UsuarioVerificado: User | null = await User.findByPk(idUser);
    if (UsuarioVerificado) {
      const response = await UsuarioVerificado.getPokemons({
        include: [
          // dentro de un array incluimos lo que se encuentra en los typos del pokemon
          {
            model: Type,
            attributes: ["name"],
            through: { attributes: [] },
          },
        ],
        joinTableAttributes: [],
      });

      return response;
    } else {
      throw new Error("Usuario No encontrado");
    }
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export default getControllerPokemonsUser;
