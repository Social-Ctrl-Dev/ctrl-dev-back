import { Router } from "express";
import * as Test from "./controller";

const routerTest = Router();

routerTest.get("/", Test.getDemo);
routerTest.delete("/test", Test.deleteTestPost);
routerTest.delete("/test2", Test.deleteTestTag);
routerTest.delete("/test3", Test.deleteTestComment);

export default routerTest;
