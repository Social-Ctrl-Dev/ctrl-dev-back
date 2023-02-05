import type { Request, Response } from "express";
import { okTrue, okFalse } from "../../responses";
const supabase_middleware = require("../../middleware/supabase-middleware");
import { PrismaClient } from "@prisma/client";
import { IUserData } from "../../interface/user";
import { supabase } from "../../services/supabase";
const bcrypt = require("bcrypt");
import axios from "axios";

const prisma = new PrismaClient();

export const getRegister = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const message = "All ok";

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });

    return okTrue({ res, status: 200, result: data, message: message });
  } catch (error) {
    return okFalse({ res, message: error });
  }
};

export const postLogin = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    // Con token
    if (req.headers.authorization) {
      const { user } = await supabase_middleware(req, res);
      const user_data = await createUser(user);
      return okTrue({
        res,
        result: user_data,
        message: "You have successfully logged in.",
      });

      // sin token, login con email/password
    } else {
      const { email, password } = req.body;
      const userBase = await prisma.user.findUnique({
        where: { email },
      });

      if (userBase) {
        const isMatch = await isUserPassword(password, userBase.password ?? "");
        if (isMatch) {
          return okTrue({
            res,
            result: userBase,
            message: "You have successfully logged in.",
          });
        } else {
          return okTrue({ res, result: null, message: "Incorrect Password." });
        }
      } else {
        return okTrue({ res, result: null, message: "Incorrect email." });
      }
    }
  } catch (error) {
    return okFalse({ res, message: error });
  }
};

export const updateUserPassword = async (
  req: Request,
  res: Response
  //password:string
): Promise<Response> => {
  try {
    const { id, old_password, new_password } = req.body;

    //retorna info completa del usuario
    const userBase = await prisma.user.findUnique({
      where: { id },
    });

    if (userBase) {
      if (!userBase.password) {
        const password = await hashUserPassword(new_password);
        const element = await setUserPassword(id, password);

        return okTrue({
          res,
          status: 200,
          result: element,
          message: "Password created successfully.",
        });
      } else {
        const isMatch = await isUserPassword(old_password, userBase.password);

        if (isMatch) {
          const password = await hashUserPassword(new_password);
          const element = await setUserPassword(id, password);

          return okTrue({
            res,
            status: 200,
            result: element,
            message: "Password updated successfully.",
          });
        } else {
          return okTrue({
            res,
            status: 200,
            result: null,
            message: "Incorrect password.",
          });
        }
      }
    }

    return okTrue({
      res,
      status: 200,
      result: "mensajito",
      message: "Incorrect user id.",
    });
  } catch (error) {
    return okFalse({ res, message: error });
  }
};

export const getUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = req.params.id;
    const user = await prisma.user.findFirst({
      where: { id: Number(id) },
      select: {
        name: true,
        email: true,
        link_portfolio: true,
        info_profile: true,
        avatar: true,
      },
    });

    if (user) {
      return okTrue({
        res,
        result: user,
        message: `Information of ${user.name}.`,
      });
    }
    return okTrue({ res, result: null, message: "Data not found." });
  } catch (error) {
    return okFalse({ res, message: error });
  }
};

export const putUserNameInfo = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {

    const { id, name, info_profile } = req.body;

    const element = await prisma.user.update({
      where: { id },
      data: { 
        name, 
        info_profile
      }
    })
    
    return okTrue({ res, result: element, message: "User updated." });
  } catch (error) {
    return okFalse({ res, message: error });
  }
}

export const postPhoneVerificationRequest = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id, name, phone } = req.body;
    const code = generateCode();
    const urlLambda = process.env.URL_GATEWAY_LAMBDA_TWILIO;

    const userBase = await findUser(id);

    if (userBase) {
      await updateUserPhoneCode(id, phone, code);

      await axios.post(
        urlLambda || "",
        {
          name,
          phone,
          code,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return okTrue({
        res,
        result: null,
        message: "Message sent successfully.",
      });
    }
    return okTrue({ res, result: null, message: "User does not exist." });
  } catch (error) {
    return okFalse({ res, message: error });
  }
};

export const postPhoneVerification = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id, code } = req.body;
    const userCode = await prisma.user.findUnique({
      where: { id },
      select: {
        code: true,
      },
    });

    if (userCode) {
      if (userCode.code === Number(code)) {
        await prisma.user.update({
          where: { id },
          data: {
            phone_is_verified: true,
          },
        });
        return okTrue({
          res,
          result: null,
          message: "Phone verification successful.",
        });
      }
      return okTrue({ res, result: null, message: "Incorrect code." });
    }
    return okTrue({ res, result: userCode, message: "User does not exist." });
  } catch (error) {
    return okFalse({ res, message: error });
  }
};

async function findUser(id: number) {
  try {
    const userBase = await prisma.user.findUnique({
      where: { id },
    });
    return userBase;
  } catch (error) {
    console.log(error);
  }
}

async function updateUserPhoneCode(id: number, phone: string, code: number) {
  try {
    await prisma.user.update({
      where: { id },
      data: {
        phone: phone,
        code: code,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

function generateCode() {
  return Math.floor(1000 + Math.random() * 9000);
}

async function createUser(user: IUserData) {
  try {
    const existing_user = await prisma.user.findFirst({
      where: { supabase_uid: user.id },
    });

    if (!existing_user) {
      const user_data = await prisma.user.create({
        data: {
          name: user.user_metadata.preferred_username,
          email: user.email,
          phone: "0",
          provider: user.identities[0].provider,
          supabase_uid: user.id,
          link_portfolio:
            "https://github.com/" + user.user_metadata.user_name,
          avatar: user.user_metadata.avatar_url,
          is_verified: user.user_metadata.email_verified,
        },
      });
      return user_data;
    } else {
      const user_data = existing_user;
      return user_data;
    }
  } catch (error) {
    console.log(error);
  }
}

async function setUserPassword(id: number, password: string) {
  try {
    const element = await prisma.user.update({
      where: { id },
      data: { password },
    });
    return element;
  } catch (error) {
    console.log(error);
  }
}

async function hashUserPassword(new_password: string) {
  try {
    const password = await bcrypt.hash(new_password, 8);
    return password;
  } catch (error) {
    console.log(error);
  }
}

async function isUserPassword(req_password: string, userBase_password: string) {
  try {
    const isMatch = await bcrypt.compare(req_password, userBase_password);
    return isMatch;
  } catch (error) {
    console.log(error);
  }
}
