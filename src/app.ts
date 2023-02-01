import express, { type Application } from "express";
// import cors from "cors";
import * as Routes from "./components";

const app: Application = express();

// app.use(cors());
app.use(express.json());

// Rutas absolutas;
app.use("/hola", Routes.routerDemo);
app.use("/auth", Routes.routerUser);
app.use("/posts", Routes.routerPost);
app.use("/tags", Routes.routerTags);
app.use("/comments", Routes.routerComment);
app.use("/likes", Routes.routerLike);

export default app;
