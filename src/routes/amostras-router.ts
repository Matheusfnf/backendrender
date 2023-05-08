import { createAmostra, deleteAmostra, getAmostra } from "../controllers/amostra.controller";
import { Router } from "express";

const AmostraRouter = Router();

AmostraRouter.get("/", getAmostra)
  .post("/", createAmostra)
  .delete("/:amostraId", deleteAmostra);

export { AmostraRouter };
