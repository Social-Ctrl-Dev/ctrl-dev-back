import { Router } from "express";
// import funciones

const routerTags = Router();

routerTags.get("/");
routerTags.get("/:id");
routerTags.post("/");

export default routerTags;
