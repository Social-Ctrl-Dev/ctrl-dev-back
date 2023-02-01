import { Router } from "express";
import * as Posts from "./controller";
const routerPost = Router();

routerPost.get("/", Posts.getPost);
routerPost.get("/:id", Posts.getIDPost);
routerPost.get("/user/:id", Posts.getUserPost);
routerPost.post("/", Posts.postPost);
routerPost.put("/:id", Posts.putPost);
routerPost.delete("/:id", Posts.deletePost);

export default routerPost;
