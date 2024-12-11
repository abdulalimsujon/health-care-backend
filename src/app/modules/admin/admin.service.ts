import { Admin, Prisma, PrismaClient } from "@prisma/client";
import { adminSearchAbleFields } from "./admin.const";
import prisma from "../../shared/Prisma";
import { paginationHelper } from "../../helper/paginationHelper";
const getAllUserFromDb = async (
  params: Record<string, unknown>,
  options: any
): Promise<Admin> => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andCondions: Prisma.AdminWhereInput[] = [];

  //console.log(filterData);
  if (params.searchTerm) {
    andCondions.push({
      OR: adminSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andCondions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  andCondions.push({
    isDeleted: false,
  });

  //console.dir(andCondions, { depth: 'inifinity' })
  const whereConditons: Prisma.AdminWhereInput = { AND: andCondions };

  const result = await prisma.admin.findMany({
    where: whereConditons,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });
  const total = await prisma.admin.count({
    where: whereConditons,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getAdminFromDbById = async (id: string) => {
  const result = await prisma.admin.findUnique({
    where: {
      id,
    },
  });
  return result;
};
const deleteAdminFromDb = async (id: string) => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id: id,
    },
  });
  const result = await prisma.$transaction(async (prismaClient) => {
    const adminDeleteData = await prismaClient.admin.delete({
      where: {
        id: id,
      },
    });

    const userDeleteData = await prismaClient.user.delete({
      where: {
        email: adminDeleteData.email,
      },
    });

    return result;
  });
};

const softDeleteFromDB = async (id: string) => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });
};
export const adminService = {
  getAllUserFromDb,
  getAdminFromDbById,
  deleteAdminFromDb,
  softDeleteFromDB,
};
