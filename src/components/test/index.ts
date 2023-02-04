import { Router } from "express";
import { getDemo, deleteTestTag, deleteTestPost } from "./controller";

const routerTest = Router();

routerTest.get("/", getDemo);
routerTest.delete("/test", deleteTestPost);
routerTest.delete("/test2", deleteTestTag);

export default routerTest;
