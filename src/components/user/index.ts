import { Router } from "express";
import { getRegister, postLogin } from "./controller";

const routerUser = Router();

routerUser.get("/register", getRegister);
routerUser.post("/login", postLogin);


export default routerUser;