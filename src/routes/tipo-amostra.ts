import {
  createTipoAmostra,
  getTipoAmostra,
  updateFinalResults,
} from "../controllers/tipoamostra.controller";
import { Router } from "express";

const TipoAmostraRouter = Router();

TipoAmostraRouter.get("/", getTipoAmostra)
  .post("/", createTipoAmostra)
  .put("/:id/:identId", updateFinalResults);

export { TipoAmostraRouter };
