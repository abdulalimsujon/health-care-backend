import { Response, Request } from "express";

import { adminService } from "./admin.service";
import pick from "../../shared/pick";
import { adminFilterableFields } from "./admin.const";

const getAllUserFromDb = async (req: Request, res: Response) => {
  const filters = pick(req.query, adminFilterableFields);
  const options = pick(req.query, ["limit", "page"]);
  const result = await adminService.getAllUserFromDb(filters, options);

  res.status(200).json({
    success: true,
    message: "all user retrived successfully",
    data: result,
  });
};

export const adminController = {
  getAllUserFromDb,
};
