import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import { okTrue, okFalse } from "../../responses";

const prisma = new PrismaClient();

export const getPost = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const element = await prisma.post.findMany({
      include: { tags: true, user: true },
    });
    return okTrue({ res, result: element, message: "All posts" });
  } catch (error) {
    return okFalse({ res, message: error });
  }
};

export const getIDPost = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const urlID = req.params.id;

    const element = await prisma.post.findMany({
      where: { userID: Number(urlID) },
      include: { tags: true, user: true },
    });

    return okTrue({ res, result: element, message: "ID posts" });
  } catch (error) {
    return okFalse({ res, message: error });
  }
};

export const postPost = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const data = req.body;

    const element = await prisma.post.create({
      data: {
        title: data.title,
        body: data.body,
        tags: { connect: { id: data.tag_id } },
        user: { connect: { id: data.user_id } },
      },
    });
    return okTrue({
      res,
      status: 201,
      result: element,
      message: "Post created",
    });
  } catch (error) {
    return okFalse({ res, message: error });
  }
};
