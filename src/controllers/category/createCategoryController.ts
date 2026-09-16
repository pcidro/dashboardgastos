import type { Request, Response } from "express";
import { CreateCategoryService } from "../../services/category/createCategoryService.js";

export class CreateCategoryController {
  async handle(req: Request, res: Response) {
    const { name, color } = req.body;
    const userId = req.user_id;

    const createCategoryService = new CreateCategoryService();

    const category = await createCategoryService.execute({
      name,
      color,
      userId,
    });

    return res.status(201).json(category);
  }
}
