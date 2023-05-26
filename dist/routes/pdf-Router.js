"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pdfRouter = void 0;
const amostraPdf_controller_1 = require("controllers/amostraPdf.controller");
const express_1 = require("express");
const pdfRouter = (0, express_1.Router)();
exports.pdfRouter = pdfRouter;
pdfRouter.get("/:id", amostraPdf_controller_1.gerarPdf);
