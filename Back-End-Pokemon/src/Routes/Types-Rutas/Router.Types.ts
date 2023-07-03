import { Router, Request, Response } from "express";
import GetTypesController from "../../Controllers/TypesPokemon/GetTypesController";
const Types = Router();

//*-------------------------Get Types--------------------------*//

Types.get("/", async (req: Request, res: Response) => {
  try {
    const response = await GetTypesController();
    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default Types;
