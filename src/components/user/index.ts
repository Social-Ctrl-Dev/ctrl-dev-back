import { Router } from "express";
import { getRegister, postLogin, updateUserPassword, getUser } from "./controller";

const routerUser = Router();

routerUser.get("/register", getRegister);
routerUser.post("/login", postLogin);
routerUser.post("/updatePass", updateUserPassword);
routerUser.get("/user/:id", getUser);


export default routerUser;