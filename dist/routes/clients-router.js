"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientRouter = void 0;
const clients_controller_1 = require("../controllers/clients.controller");
const clients_middleware_1 = require("../middlewares/clients-middleware");
const clients_schema_1 = require("../schemas/clients-schema");
const express_1 = require("express");
const ClientRouter = (0, express_1.Router)();
exports.ClientRouter = ClientRouter;
ClientRouter
    .get("/", clients_controller_1.getCustomers)
    .post("/", (0, clients_middleware_1.validateClientSchema)(clients_schema_1.ClientSchema), clients_controller_1.createCustomer)
    .delete("/:id", clients_controller_1.deleteCustomer);
