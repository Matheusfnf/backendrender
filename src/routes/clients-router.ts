import { createCustomer, deleteCustomer, getCustomers } from "../controllers/clients.controller";
import { validateClientSchema } from "../middlewares/clients-middleware";

import { ClientSchema } from "../schemas/clients-schema";
import { Router } from "express";

const ClientRouter = Router();

ClientRouter
  .get("/", getCustomers)
  .post("/", validateClientSchema(ClientSchema), createCustomer)
  .delete("/:id", deleteCustomer);

export { ClientRouter };
