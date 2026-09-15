import { prisma } from "../../lib/prisma.js";
import { AppError } from "../../middlewares/AppError.js";

export class DetailUserService {
  async execute(userId: string) {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    return user;
  }
}
