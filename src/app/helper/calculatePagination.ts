interface Ipagination {
  page: number;
  limit: number;
  sortOrder: string;
  sortBy: string;
}
interface IpaginationResult {
  page: number;
  limit: number;
  sortOrder: string;
  skip: number;
  sortBy: string;
}

export const calculatePagination = (
  options: Ipagination
): IpaginationResult => {
  const page = Number(options.page) || 1;
  const limit = Number(options.limit) || 10;
  const skip = Number(options.page - 1) * options.limit;
  const sortBy = options.sortBy || "createdAt";
  const sortOrder = options.sortOrder || "des";

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};
