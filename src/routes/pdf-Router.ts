import { gerarPdf } from "controllers/amostraPdf.controller";
import { Router } from "express";

const pdfRouter = Router();

pdfRouter.get("/:id", gerarPdf);

export { pdfRouter };
