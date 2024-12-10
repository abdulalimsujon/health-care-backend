import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcrypt";
import prisma from "../../shared/Prisma";

const createAdmin = async (data: any) => {
  console.log(data);
  const hashedPassword = await bcrypt.hash(data.password, 12);
  const userData = {
    email: data.admin.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    const createduserdata = await transactionClient.user.create({
      data: userData,
    });

    const createAdmindata = await transactionClient.admin.create({
      data: data.admin,
    });
    return createAdmindata;
  });

  return result;
};

export const userService = {
  createAdmin,
};
