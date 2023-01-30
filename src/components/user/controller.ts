import type { Request, Response } from "express";
import { okTrue, okFalse } from "../../responses";
import { createClient } from "@supabase/supabase-js";
const supabase_middleware = require('../../middleware/supabase-middleware');


import dotenv from "dotenv";
dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_PROJECT_URL ?? "",
  process.env.SUPABASE_API_KEY ?? ""
);

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
  console.log("ok1");
  try {
    const message = "All ok";
    

    
    
    return okTrue({ res, result: "ok", message: message });

  } catch (error) {
    return okFalse({ res, message: error });
  }
};
