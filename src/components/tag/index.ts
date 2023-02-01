import { Router } from "express";
import * as Tags from "./controller";

const routerTags = Router();

routerTags.get("/", Tags.getTag);
routerTags.get("/:id", Tags.getIDTag);
routerTags.post("/", Tags.postTag);
routerTags.put("/:id", Tags.putTag);
routerTags.delete("/:id", Tags.deleteTag);

export default routerTags;
