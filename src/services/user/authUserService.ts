import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../../lib/prisma.js";
import { AppError } from "../../middlewares/AppError.js";

interface AuthUserServiceProps {
  email: string;
  password: string;
}

export class AuthUserService {
  async execute({ email, password }: AuthUserServiceProps) {
    const normalizedEmail = email.trim().toLowerCase();

    const user = await prisma.user.findFirst({
      where: {
        email: normalizedEmail,
      },
    });

    if (!user) {
      throw new AppError("Email ou senha incorretos", 401);
    }

    const passwordMatch = await compare(password, user.passwordHash);

    if (!passwordMatch) {
      throw new AppError("Email ou senha incorretos", 401);
    }

    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET as string,
      {
        subject: user.id,
        expiresIn: "30d",
      },
    );

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    };
  }
}
