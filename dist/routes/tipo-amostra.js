"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoAmostraRouter = void 0;
const tipoamostra_controller_1 = require("../controllers/tipoamostra.controller");
const express_1 = require("express");
const TipoAmostraRouter = (0, express_1.Router)();
exports.TipoAmostraRouter = TipoAmostraRouter;
TipoAmostraRouter.get("/", tipoamostra_controller_1.getTipoAmostra)
    .post("/", tipoamostra_controller_1.createTipoAmostra)
    .put("/:id/:identId", tipoamostra_controller_1.updateFinalResults);
