import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";
import { okTrue, okFalse } from "../../responses";
import { connect } from "http2";

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

export const postComment = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const data = req.body;

    const element = await prisma.comment.create({
      data: {
        body: data.body,
        post: { connect: { id: data.post_id } },
        user: { connect: { id: data.user_id } },
      },
    });

    return okTrue({
      res,
      status: 201,
      result: element,
      message: "Comment created",
    });
  } catch (error) {
    return okFalse({ res, message: error });
  }
};

export const putComment = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const idURL = req.params.id;
    const data = req.body;

    const element = await prisma.comment.update({
      where: { id: Number(idURL) },
      data: {
        body: data.body,
      },
    });

    return okTrue({ res, result: element, message: "Comment updated" });
  } catch (error) {
    return okFalse({ res, message: error });
  }
};

export const deleteComment = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const idURL = req.params.id;

    const element = await prisma.comment.delete({
      where: { id: Number(idURL) },
    });

    return okTrue({ res, result: element, message: "Comment deleted" });
  } catch (error) {
    return okFalse({ res, message: error });
  }
};
