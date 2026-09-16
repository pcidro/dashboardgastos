import type { Request, Response } from "express";
import { DeleteCategoryService } from "../../services/category/deleteCategoryService.js";

export class DeleteCategoryController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const userId = req.user_id;

    const deleteCategoryService = new DeleteCategoryService();

    const category = await deleteCategoryService.execute({
      id: id as string,
      userId,
    });

    return res.json(category);
  }
}
