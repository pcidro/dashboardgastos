import { prisma } from "../../lib/prisma.js";
import { AppError } from "../../middlewares/AppError.js";
import type { CreateCategoryDTO } from "../../types/categoryType.js";

export class CreateCategoryService {
  async execute({ name, color, userId }: CreateCategoryDTO) {
    const trimmedName = name.trim();

    const categoryAlreadyExists = await prisma.category.findFirst({
      where: {
        userId,
        name: {
          equals: trimmedName,
          mode: "insensitive",
        },
      },
    });

    if (categoryAlreadyExists) {
      throw new AppError("Category with this name already exists!", 400);
    }

    const category = await prisma.category.create({
      data: {
        name: trimmedName,
        color: color ?? null,
        userId,
      },
    });

    return category;
  }
}
