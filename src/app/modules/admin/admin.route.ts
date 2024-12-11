import express from "express";
import { adminController } from "./admin.controller";

const router = express.Router();
router.get("/", adminController.getAllFromDB);
router.get("/:id", adminController.getSingleadminById);
router.delete("/:id", adminController.deleteDSingleAdmin);
router.delete("/soft/:id", adminController.softDeleteFromDB);

export const adminRouter = router;
