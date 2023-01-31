import { Router } from "express";
import * as Like from "./controller"

const routerLike = Router();
routerLike.post("/like", Like.postLike);

export default routerLike;