import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { okTrue, okFalse } from "../../responses";

const prisma = new PrismaClient();

export const getTag = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const element = await prisma.tag.findMany();

    return okTrue({ res, result: element, message: "All tags" });
  } catch (error) {
    return okFalse({ res, message: error });
  }
};

export const postTag = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const element = await prisma.tag.create({
      data: {
        name: data.name,
      },
    });

    return okTrue({ res, result: element, message: "Tag created" });
  } catch (error) {
    return okFalse({ res, message: error });
  }
};
