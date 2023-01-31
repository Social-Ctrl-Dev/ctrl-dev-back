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

export const getIDTag = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const idURL = req.params.id;

    const element = await prisma.tag.findMany({ where: { id: Number(idURL) } });

    return okTrue({ res, result: element, message: `Tag ${idURL}` });
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

export const deleteTag = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const idURL = req.params.id;

    const element = await prisma.tag.delete({ where: { id: Number(idURL) } });

    return okTrue({ res, result: element, message: "Tag deleted" });
  } catch (error) {
    return okFalse({ res, message: error });
  }
};
