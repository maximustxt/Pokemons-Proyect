import { Router, Request, Response } from "express";
import DeleteFavoritosController from "../../Controllers/Favoritos/DeleteFavoritosController";
import GetFavoritosController from "../../Controllers/Favoritos/GetFavoritosController";
import PostFavoritosController from "../../Controllers/Favoritos/PostFavoritosController";

const PokemonsFavoritos = Router();

//*------------------------Get Favoritos--------------------*//
PokemonsFavoritos.get("/:idUser", async (req: Request, res: Response) => {
  try {
    const { idUser } = req.params;
    const response = await GetFavoritosController(Number(idUser));
    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

//*--------------------------Post Favoritos-------------------*//
PokemonsFavoritos.post("/:idUser", async (req: Request, res: Response) => {
  const favorito = req.body;
  const { idUser } = req.params;

  try {
    const response = await PostFavoritosController(favorito, Number(idUser));
    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

//*--------------------------Delete Favoritos-------------------*//
PokemonsFavoritos.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { idUser } = req.query;

  try {
    const response = await DeleteFavoritosController(id, Number(idUser));
    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default PokemonsFavoritos;
