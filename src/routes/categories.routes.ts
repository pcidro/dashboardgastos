import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { CreateCategoryController } from "../controllers/category/createCategoryController.js";
import { UpdateCategoryController } from "../controllers/category/updateCategoryController.js";
import { DeleteCategoryController } from "../controllers/category/deleteCategoryController.js";
import { GetCategoriesController } from "../controllers/category/getCategoriesController.js";
import { createCategorySchema } from "../schemas/category/createCategorySchema.js";
import { updateCategorySchema } from "../schemas/category/updateCategorySchema.js";
import { deleteCategorySchema } from "../schemas/category/deleteCategorySchema.js";

const categoriesRoutes = Router();

categoriesRoutes.post(
  "/categories",
  isAuthenticated,
  validateSchema(createCategorySchema),
  new CreateCategoryController().handle,
);

categoriesRoutes.get(
  "/categories",
  isAuthenticated,
  new GetCategoriesController().handle,
);

categoriesRoutes.put(
  "/categories/:id",
  isAuthenticated,
  validateSchema(updateCategorySchema),
  new UpdateCategoryController().handle,
);

categoriesRoutes.delete(
  "/categories/:id",
  isAuthenticated,
  validateSchema(deleteCategorySchema),
  new DeleteCategoryController().handle,
);

export { categoriesRoutes };
