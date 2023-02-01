import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";
import { okTrue, okFalse } from "../../responses";
import { ILikeData, ILikeExistsData } from "../../interface/like";

const prisma = new PrismaClient();

export const postLike = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const data = req.body;
    const { user_id, post_id } = data;

    const likeExists = await prisma.like.findMany({
      where: { user_id, post_id },
    });

    if (likeExists.length === 0) {
      const newLike = await like(data);

      return okTrue({ res, result: newLike, message: "Like created" });
    } else {
      const newUnLike = await unlike(likeExists[0]);

      return okFalse({ res, result: newUnLike, message: "Like deleted" });
    }
  } catch (error) {
    return okFalse({ res, message: error });
  }
};

const like = async (data: ILikeData) => {
  const { user_id, post_id } = data;

  const res = await prisma.like.create({
    data: { user_id, post_id },
  });
  return res;
};

const unlike = async (data: ILikeExistsData) => {
  const id = data.id;

  const res = await prisma.like.delete({
    where: {id},
  });
  return res;
};
