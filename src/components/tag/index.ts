import { Router } from "express";
import * as Tags from "./controller";

const routerTags = Router();

routerTags.get("/", Tags.getTag);
routerTags.get("/:id");
routerTags.post("/", Tags.postTag);

export default routerTags;
