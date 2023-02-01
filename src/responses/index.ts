import type { Response } from "express";

interface InterResponse {
  res: Response;
  status?: number;
  message: any;
  result?: any;
}

export function okTrue({ res, status = 200, message, result}: InterResponse): Response {
  return res.status(status).json({
    ok: true,
    message,
    result,
  });
}

export function okFalse({ res, status = 500, message }: InterResponse): Response {
  return res.status(status).json({
    ok: false,
    message,
  });
}
