import { prisma } from "../../lib/prisma.js";
import { AppError } from "../../middlewares/AppError.js";
import type { UpdateCategoryDTO } from "../../types/categoryType.js";

export class UpdateCategoryService {
  async execute({ id, name, color, userId }: UpdateCategoryDTO) {
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
        "Unauthorized! You can only edit your own categories.",
        403,
      );
    }

    const trimmedName = name !== undefined ? name.trim() : undefined;

    if (
      trimmedName &&
      trimmedName.toLowerCase() !== category.name.toLowerCase()
    ) {
      const categoryWithSameName = await prisma.category.findFirst({
        where: {
          userId,
          name: {
            equals: trimmedName,
            mode: "insensitive",
          },
          id: {
            not: id,
          },
        },
      });

      if (categoryWithSameName) {
        throw new AppError("Category with this name already exists!", 400);
      }
    }

    const updatedCategory = await prisma.category.update({
      where: {
        id,
      },
      data: {
        name: trimmedName ?? category.name,
        color: color !== undefined ? color : category.color,
      },
    });

    return updatedCategory;
  }
}
