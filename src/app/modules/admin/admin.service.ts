import { PrismaClient } from "@prisma/client";
import { adminSearchAbleFields } from "./admin.const";
import { calculatePagination } from "../../helper/calculatePagination";

const prisma = new PrismaClient();

const getAllUserFromDb = async (params: any, options: any) => {
  const andCondition = [];

  const { page, limit, sortBy, sortOrder, skip } = calculatePagination(options);

  const { searchTerm, ...filterData } = params;

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

  // filter for specifics fields

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

  if (Object.keys(filterData).length > 0) {
    andCondition.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: filterData[key],
        },
      })),
    });
  }

  const whereCondition: AdminWhereInput = { AND: andCondition };
  //console.dir(whereCondition, { depth: "inifinity" });
  try {
    const result = await prisma.admin.findMany({
      where: whereCondition,
      skip,
      take: limit,
      orderBy:
        options.sortBy && options.orderBy
          ? {
              [options.sortBy]: [options.orderBy],
            }
          : {
              createdAt: "desc",
            },
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
