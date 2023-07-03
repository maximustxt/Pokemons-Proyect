import { Router, Request, Response } from "express";
import PostUserController from "../../Controllers/Usuarios/PostUserController";
import PostUserInicioSesionControllers from "../../Controllers/Usuarios/PostUserInicioSesionControllers";
import { Users, UserSesion } from "../../Interface/InterfaceAll";
const Usuario = Router();

//*-------------------------Registro User--------------------------*//

Usuario.post("/", async (req: Request, res: Response) => {
  try {
    const user: Users = req.body;

    const { email, password, name } = user;

    if (!email.length || !password.length || !name.length) {
      throw new Error("Debes Enviar todos los campos obligatorios!");
    }
    const response = await PostUserController(user);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

//*-------------------------Inicio de Sesion User--------------------------*//

Usuario.post("/InicioSesion", async (req: Request, res: Response) => {
  try {
    const user: UserSesion = req.body;
    const { email, password } = user;

    if (!email.length || !password.length) {
      throw new Error("Debes Enviar todos los campos obligatorios!");
    }
    const response = await PostUserInicioSesionControllers({ email, password });
    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default Usuario;
