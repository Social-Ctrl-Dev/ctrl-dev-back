import express, { type Application } from "express";
// import cors from "cors";
import { routerDemo, routerUser } from "./components";

const app: Application = express();

// app.use(cors());
app.use(express.json());

// Rutas absolutas;
app.use("/hola", routerDemo);
app.use("/auth", routerUser)

export default app;
