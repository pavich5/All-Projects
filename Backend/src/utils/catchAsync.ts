import { Request, Response, NextFunction } from "express";
import { CustomError } from "./customError";

export const catchAsync = (func: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    func(req, res, next).catch((e: CustomError) => next(e));
  };
};
