import { Router } from "express";
// import funciones

const routerComment = Router();

routerComment.get("/");
routerComment.get("/:id");
routerComment.post("/");
routerComment.put("/");
routerComment.delete("/");

export default routerComment;
