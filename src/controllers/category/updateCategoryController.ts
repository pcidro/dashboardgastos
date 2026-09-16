import type { Request, Response } from "express";
import { UpdateCategoryService } from "../../services/category/updateCategoryService.js";

export class UpdateCategoryController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { name, color } = req.body;
    const userId = req.user_id;

    const updateCategoryService = new UpdateCategoryService();

    const category = await updateCategoryService.execute({
      id: id as string,
      name,
      color,
      userId,
    });

    return res.json(category);
  }
}
