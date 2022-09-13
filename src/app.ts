import express from "express";
import "reflect-metadata";
import "express-async-errors";
import usersRoutes from "./routes/users.routes";
import { errorMiddleware } from "./middlewares/error.middleware";
import sessionRoutes from "./routes/session.routes";
import resetRoutes from "./routes/resetPassword.routes";
import matchRoutes from "./routes/match.routes";

const app = express();

app.use(express.json());

app.use("/user", usersRoutes);
app.use("/session", sessionRoutes);
app.use("/resetPassword", resetRoutes);
app.use("/match", matchRoutes);

app.use(errorMiddleware);

export default app;