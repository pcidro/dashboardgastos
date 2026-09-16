import { prisma } from "../../lib/prisma.js";
import { AppError } from "../../middlewares/AppError.js";
import type { DeleteCategoryDTO } from "../../types/categoryType.js";

export class DeleteCategoryService {
  async execute({ id, userId }: DeleteCategoryDTO) {
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      throw new AppError("Category not found!", 404);
    }

    if (category.userId !== userId) {
      throw new AppError(
        "Unauthorized! You can only delete your own categories.",
        403,
      );
    }

    const linkedTransactionsCount = await prisma.transaction.count({
      where: {
        categoryId: id,
      },
    });

    if (linkedTransactionsCount > 0) {
      throw new AppError(
        "Cannot delete category with associated transactions!",
        400,
      );
    }

    const deletedCategory = await prisma.category.delete({
      where: {
        id,
      },
    });

    return deletedCategory;
  }
}
