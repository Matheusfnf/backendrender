"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmostraRouter = void 0;
const amostra_controller_1 = require("../controllers/amostra.controller");
const express_1 = require("express");
const AmostraRouter = (0, express_1.Router)();
exports.AmostraRouter = AmostraRouter;
AmostraRouter.get("/", amostra_controller_1.getAmostra)
    .post("/", amostra_controller_1.createAmostra)
    .delete("/:amostraId", amostra_controller_1.deleteAmostra);
