import { Router } from "express";
import { CreateUserController } from "../controllers/user/createuser.js";

const userRoutes = Router();

userRoutes.post("/user", new CreateUserController().handle);

userRoutes.post("/session");

export { userRoutes };
