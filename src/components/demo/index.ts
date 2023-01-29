import { Router } from "express";
import { getDemo } from "./controller";

const routerDemo = Router();

routerDemo.get("/", getDemo);

export default routerDemo;
