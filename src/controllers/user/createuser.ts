import type { Request, Response } from "express";
import { createUserService } from "../../services/user/createUserService.js";

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const user = await new createUserService().execute({
      name,
      email,
      password,
    });
    return res.json(user);
  }
}
