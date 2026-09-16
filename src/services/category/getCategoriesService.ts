import { prisma } from "../../lib/prisma.js";
import type { GetCategoriesDTO } from "../../types/categoryType.js";

export class GetCategoriesService {
  async execute({ userId }: GetCategoriesDTO) {
    const categories = await prisma.category.findMany({
      where: {
        userId,
      },
      orderBy: {
        name: "asc",
      },
    });

    return categories;
  }
}
