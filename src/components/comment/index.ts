import { Router } from "express";
import * as Comment from "./controller";

const routerComment = Router();

routerComment.get("/user/:id", Comment.getUserComment);
routerComment.get("/post/:id", Comment.getPostComment);
routerComment.post("/");
routerComment.put("/");
routerComment.delete("/");

export default routerComment;
