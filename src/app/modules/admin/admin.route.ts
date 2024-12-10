import express from "express";
import { adminController } from "./admin.controller";

const router = express.Router();
router.get("/", adminController.getAllFromDB);

export const adminRouter = router;
