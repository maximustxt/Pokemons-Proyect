import { Abilitie } from "../../models/Modelos-Pokemon-Type/Tablas-Pokemon-Types";

const GetControllerAbilities = async () => {
  try {
    const response = await Abilitie.findAll();

    if (response.length) {
      return response;
    } else {
      throw new Error("No existe las Habilidades");
    }
  } catch (error) {}
};

export default GetControllerAbilities;
