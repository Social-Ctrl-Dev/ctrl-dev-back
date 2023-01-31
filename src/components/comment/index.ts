import { Router } from "express";
import * as Comment from "./controller";

const routerComment = Router();

routerComment.get("/user/:id", Comment.getUserComment);
routerComment.get("/post/:id", Comment.getPostComment);
routerComment.post("/", Comment.postComment);
routerComment.put("/:id", Comment.putComment);
routerComment.delete("/:id", Comment.deleteComment);

export default routerComment;
