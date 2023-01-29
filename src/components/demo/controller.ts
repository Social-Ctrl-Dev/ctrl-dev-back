import type { Request, Response } from "express";
import { okTrue, okFalse } from "../../responses";

export const getDemo = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const element = { a1: "tru", a2: "tone" };
    const message = "All ok";

    return okTrue({ res, status: 200, result: element, message: message });
  } catch (error) {
    return okFalse({ res, message: error });
  }
};
