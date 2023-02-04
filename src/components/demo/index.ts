import { Router } from "express";
import { getDemo, deleteTest } from "./controller";

const routerDemo = Router();

routerDemo.get("/", getDemo);
routerDemo.delete("/test", deleteTest);

export default routerDemo;
