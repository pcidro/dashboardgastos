import { Router } from "express";
import { CreateUserController } from "../controllers/user/createuser.js";
import { createUserSchema } from "../schemas/user/createUserSchema.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { AuthUserController } from "../controllers/user/authUserController.js";
import { DetailUserController } from "../controllers/user/detailUserController.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const userRoutes = Router();

userRoutes.post(
  "/user",
  validateSchema(createUserSchema),
  new CreateUserController().handle,
);

userRoutes.post("/login", new AuthUserController().handle);

userRoutes.get("/me", isAuthenticated, new DetailUserController().handle);

export { userRoutes };
