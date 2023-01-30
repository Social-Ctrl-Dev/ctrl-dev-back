import { Router } from "express";
import * as Posts from "./controller";
const routerPost = Router();

routerPost.get("/", Posts.getPost);
routerPost.get("/:id", Posts.getIDPost);
routerPost.post("/", Posts.postPost);

export default routerPost;
