import type { Request, Response } from "express";
import { okTrue, okFalse } from "../../responses";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

export const deleteTestPost = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const element = await prisma.post.deleteMany({
      where: { title: "post-test-delete" },
    });

    return okTrue({ res, result: element, message: "Delete all test posts" });
  } catch (error) {
    console.log(error);
    return okFalse({ res, message: error });
  }
};

export const deleteTestTag = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const element = await prisma.tag.deleteMany({
      where: { name: "tag-test-delete" },
    });

    return okTrue({ res, result: element, message: "Delete all test tags" });
  } catch (error) {
    console.log(error);
    return okFalse({ res, message: error });
  }
};

export const deleteTestComment = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const element = await prisma.comment.deleteMany({
      where: { body: "comment-test-delete" },
    });

    return okTrue({
      res,
      result: element,
      message: "Delete all test comments",
    });
  } catch (error) {
    console.log(error);
    return okFalse({ res, message: error });
  }
};
