import { Response, Request } from "express";

import pick from "../../shared/pick";
import { adminFilterableFields } from "./admin.const";
import sendResponse from "../../shared/sendResponse";
import catchAsync from "../../shared/catchAsync";
import { adminService } from "./admin.service";

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  // console.log(req.query)
  const filters = pick(req.query, adminFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  console.log(options);
  const result = await adminService.getAllUserFromDb(filters, options);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin data fetched!",
    meta: result.meta,
    data: result.data,
  });
});

export const adminController = {
  getAllFromDB,
};
