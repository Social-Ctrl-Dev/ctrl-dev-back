import { Router } from "express";
import * as Like from "./controller"

const routerLike = Router();
routerLike.post("/", Like.postLike);

export default routerLike;