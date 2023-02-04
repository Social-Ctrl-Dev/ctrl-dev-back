import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { okTrue, okFalse } from "../../responses";

const prisma = new PrismaClient();

export const getPost = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const element = await prisma.post.findMany({
      include: { tags: true, user: true, comment: true },
    });

    const elements = await Promise.all(
      element.map(async (elem) => {
        const likesCount = await prisma.like.count({
          where: { post_id: elem.id },
        });
        return {
          likesCount,
          ...elem,
        };
      })
    );

    return okTrue({
      res,
      result: elements,
      message: "All posts with likes count",
    });
  } catch (error) {
    return okFalse({ res, message: error });
  }
};

export const getIDPost = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const idURL = req.params.id;

    const element = await prisma.post.findUnique({
      where: { id: Number(idURL) },
      include: { user: true, tags: true, comment: true },
    });

    const likesCount = await prisma.like.count({
      where: { post_id: Number(idURL) },
    });

    return okTrue({
      res,
      result: { ...element, likesCount },
      message: `Posts ${idURL}`,
    });
  } catch (error) {
    return okFalse({ res, message: error });
  }
};

export const getUserPost = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const urlID = req.params.id;

    const element = await prisma.post.findMany({
      where: { userID: Number(urlID) },
      include: { tags: true, comment: true },
    });

    return okTrue({
      res,
      result: element,
      message: `ID posts for user ${urlID}`,
    });
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
    const dataTag = data.tag_id;

    if (dataTag) {
      const element = await prisma.post.create({
        data: {
          title: data.title,
          body: data.body,
          tags: { connect: { id: data.tag_id } },
          user: { connect: { id: data.user_id } },
        },
        include: { tags: true },
      });

      return okTrue({
        res,
        status: 201,
        result: element,
        message: "Post created with tag",
      });
    } else {
      const element = await prisma.post.create({
        data: {
          title: data.title,
          body: data.body,
          user: { connect: { id: data.user_id } },
        },
      });

      return okTrue({
        res,
        status: 201,
        result: element,
        message: "Post created",
      });
    }
  } catch (error) {
    return okFalse({ res, message: error });
  }
};

export const putPost = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const idURL = req.params.id;
    const data = req.body;

    const element = await prisma.post.update({
      where: { id: Number(idURL) },
      include: { tags: true },
      data: {
        title: data.title,
        body: data.body,
        tags: { connect: data.tag_id.map((tag: number) => ({ id: tag })) },
      },
    });

    return okTrue({ res, result: element, message: `Post #${idURL} updated` });
  } catch (error) {
    console.log(error);
    return okFalse({ res, message: error });
  }
};

export const putTagPost = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const idURL = req.params.id;
    const data = req.body;

    const element = await prisma.post.update({
      where: { id: Number(idURL) },
      include: { tags: true },
      data: {
        tags: { disconnect: data.tag_id.map((tag: number) => ({ id: tag })) },
      },
    });

    return okTrue({
      res,
      result: element,
      message: `Tags from post #${idURL} deleted`,
    });
  } catch (error) {
    return okFalse({ res, message: error });
  }
};

export const deletePost = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const idURL = req.params.id;

    const element = await prisma.post.delete({
      where: {
        id: Number(idURL),
      },
      include: { comment: true },
    });

    return okTrue({ res, result: element, message: `Post #${idURL} deleted` });
  } catch (error) {
    return okFalse({ res, message: error });
  }
};
