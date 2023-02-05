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
    const idURL:string = req.params.id;

    const element = await prisma.tag.findUnique({
      where: { id: Number(idURL) },
    });

    if (element) {
      return okTrue({ res, result: element, message: `Tag #${idURL}` });
    } else {
      return okFalse({ res, status: 404, message: `Tag #${idURL} not found` });
    }
  } catch (error) {
    console.log(error);
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

    return okTrue({
      res,
      status: 201,
      result: element,
      message: "Tag created",
    });
  } catch (error) {
    return okFalse({ res, message: error });
  }
};

export const putTag = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const idURL = req.params.id;
    const data = req.body;

    const element = await prisma.tag.update({
      where: { id: Number(idURL) },
      data: {
        name: data.name,
      },
    });

    return okTrue({
      res,
      status: 202,
      result: element,
      message: `Tag #${idURL} updated`,
    });
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

    return okTrue({ res, result: element, message: `Tag #${idURL} deleted` });
  } catch (error) {
    return okFalse({ res, message: error });
  }
};
