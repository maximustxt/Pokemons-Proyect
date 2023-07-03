import { Router, Request, Response } from "express";
import GetControllerAbilities from "../../Controllers/Abilities/GetControllerAbilities";

const Abilities = Router();

Abilities.get("/", async (req: Request, res: Response) => {
  try {
    const response = await GetControllerAbilities();
    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default Abilities;
