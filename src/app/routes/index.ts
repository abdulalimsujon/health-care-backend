import express from "express";
import { adminRouter } from "../modules/admin/admin.route";
import { userRouter } from "../modules/User/user.route";

const router = express.Router();
const moduleRoutes = [
  {
    path: "/admin",
    route: adminRouter,
  },
  {
    path: "/users",
    route: userRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
