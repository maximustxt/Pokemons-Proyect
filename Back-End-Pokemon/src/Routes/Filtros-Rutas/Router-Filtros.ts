import { Router, Request, Response } from "express";
import { Filtros } from "../../Interface/InterfaceAll";
import FiltrosTyposController from "../../Controllers/Filtros/FiltrosTyposController";
import OrdenamientoSelectController from "../../Controllers/Filtros/OrdenamientoSelectController";
const Filtros = Router();

//*---------------------------All Filtros------------------------------------*//

Filtros.get("/", async (req: Request, res: Response) => {
  try {
    let arrayTypes = req.query.ArrayType as string;
    if (arrayTypes && arrayTypes.length > 0) {
      const arraydeTypesPokemons = arrayTypes.split(",");
      const respuesta = await FiltrosTyposController(arraydeTypesPokemons);
      res.status(200).json(respuesta);
    } else {
      const respuesta = await FiltrosTyposController([]);
      res.status(200).json(respuesta);
    }
  } catch (error: any) {
    res.status(500).json({ Error: error.message });
  }
});

//*--------------------------Ordenamientos-------------------------------------*//

Filtros.get("/Ordenamientos/:name", async (req: Request, res: Response) => {
  //voy a pasar por query el typo de ordenamiento.
  // si nos llega numero superior , u otro tipo de ordenamiento.

  const { name } = req.params;

  try {
    const respuesta = await OrdenamientoSelectController(name);
    res.status(200).json(respuesta);
  } catch (error: any) {
    res.status(500).json({ Error: error.message });
  }
});

export default Filtros;
