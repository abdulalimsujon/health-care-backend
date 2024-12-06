import { Response, Request } from "express";

import { adminService } from "./admin.service";

const getAllUserFromDb = async (req: Request, res: Response) => {
  const result = await adminService.getAllUserFromDb(req.query);

  res.status(200).json({
    success: true,
    message: "all user retrived successfully",
    data: result,
  });
};

export const adminController = {
  getAllUserFromDb,
};
