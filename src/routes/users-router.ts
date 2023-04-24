import { Router } from "express";
import { createUserSchema } from "../schemas/users.schema";

import { usersPost } from "../controllers/users-controller";
import { validateBody } from "../middlewares/validation-middleware";

const usersRouter = Router();

usersRouter.post("/", validateBody(createUserSchema), usersPost);

export { usersRouter };
