import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";
import { okTrue, okFalse } from "../../responses";

const prisma = new PrismaClient();

export const getUserComment = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const idURL = req.params.id;

    const element = await prisma.comment.findMany({
      where: { userID: Number(idURL) },
      include: { post: true },
    });

    return okTrue({
      res,
      result: element,
      message: `All comments for user ${idURL}`,
    });
  } catch (error) {
    return okFalse({ res, message: error });
  }
};

export const getPostComment = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const idURL = req.params.id;

    const element = await prisma.comment.findMany({
      where: { postID: Number(idURL) },
      include: { user: true },
    });

    return okTrue({
      res,
      result: element,
      message: `All comments for post ${idURL}`,
    });
  } catch (error) {
    return okFalse({ res, message: error });
  }
};
