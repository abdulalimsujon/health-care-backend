import express, { Application, Response, Request } from "express";
import cors from "cors";
import { userRouter } from "./app/modules/User/user.route";
import { adminRouter } from "./app/modules/admin/admin.route";

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/users", userRouter);
app.use("/api/v1/admin", adminRouter);

app.get("/", (req: Request, res: Response) => {
  res.send({ message: "health care server" });
});

export default app;
