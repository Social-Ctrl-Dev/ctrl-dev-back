import { Router } from "express";
import {
  getRegister,
  postLogin,
  updateUserPassword,
  getUser,
  postPhoneVerificationRequest,
  postPhoneVerification,
  putUserNameInfo,
} from "./controller";

const routerUser = Router();

routerUser.get("/register", getRegister);
routerUser.post("/login", postLogin);
routerUser.post("/updatePass", updateUserPassword);
routerUser.put("/updatenameinfo", putUserNameInfo);
routerUser.get("/user/:id", getUser);
routerUser.post("/phone/sendsms", postPhoneVerificationRequest);
routerUser.post("/phone/verify", postPhoneVerification);

export default routerUser;
