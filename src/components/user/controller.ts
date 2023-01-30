import type { Request, Response } from "express";
import { okTrue, okFalse } from "../../responses";
const supabase_middleware = require('../../middleware/supabase-middleware');
import { PrismaClient } from "@prisma/client";
import {IUserData} from "../../interface/user"
import { supabase } from "../../services/supabase";

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
    const message = "All ok";
    
    const {user} = await supabase_middleware(req,res);
    
    const user_data = await createUser(user)
    
    return okTrue({ res, result: user_data, message: message });

  } catch (error) {
    return okFalse({ res, message: error });
  }
};

async function createUser(user: IUserData){
  try {
    const existing_user = await prisma.user.findFirst({ where: { supabase_uid: user.id } });

    if (!existing_user){
      const user_data = await prisma.user.create({
        data: {
          name: user.user_metadata.user_name,
          email: user.email,
          phone: "0",
          provider: user.identities[0].provider,
          supabase_uid: user.id,
          link_portfolio: "https://github.com/" + user.user_metadata.preferred_username,
          avatar: user.user_metadata.avatar_url,
          is_verified: user.user_metadata.email_verified,
        }
      })
      return user_data;
    }else{
      const user_data = existing_user
      return user_data
    }

  } catch (error){
    console.log(error);
  }
  
};