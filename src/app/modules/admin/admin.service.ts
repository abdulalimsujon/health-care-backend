import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const getAllUserFromDb = async (params: any) => {
  const andCondition = [];

  // {
  //   name: {
  //     contains: params.searchTerm,
  //   },
  // },
  // {
  //   email: {
  //     contains: params.searchTerm,
  //   },
  // },

  const adminSearchAbleFields = ["name", "email"];

  if (params.searchTerm) {
    andCondition.push({
      OR: adminSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }
  console.log(andCondition);

  const whereCondition: AdminWhereInput = { AND: andCondition };
  try {
    const result = await prisma.admin.findMany({
      where: whereCondition,
    });
    return result;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  } finally {
    await prisma.$disconnect(); // Clean up Prisma connection
  }
};

export const adminService = {
  getAllUserFromDb,
};
