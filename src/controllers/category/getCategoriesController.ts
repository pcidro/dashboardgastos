import type { Request, Response } from "express";
import { GetCategoriesService } from "../../services/category/getCategoriesService.js";

export class GetCategoriesController {
  async handle(req: Request, res: Response) {
    const userId = req.user_id;

    const getCategoriesService = new GetCategoriesService();

    const categories = await getCategoriesService.execute({
      userId,
    });

    return res.json(categories);
  }
}
