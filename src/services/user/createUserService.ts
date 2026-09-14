import { hash } from "bcryptjs";
import { prisma } from "../../lib/prisma.js";
import type { UserType } from "../../types/userType.js";

export class createUserService {
  async execute({ name, email, password }: UserType) {
    const normalizedEmail = email.trim().toLowerCase();
    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
    });

    if (userAlreadyExists) {
      throw new Error("Usuário já cadastrado!");
    }

    const passwordHash = await hash(password, 8);

    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: normalizedEmail,
        passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
        categories: true,
        transactions: true,
      },
    });
    return user;
  }
}
