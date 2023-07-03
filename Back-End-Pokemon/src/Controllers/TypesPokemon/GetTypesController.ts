import { Type } from "../../models/Modelos-Pokemon-Type/Tablas-Pokemon-Types";

const GetTypesController = async () => {
  try {
    let respuesta = await Type.findAll();
    return respuesta;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default GetTypesController;
