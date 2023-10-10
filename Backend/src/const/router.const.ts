import { Router } from "express";
import { productsRouter } from "../routes/products.routes";
export const globalRouter = Router();

globalRouter.use("/products", productsRouter);
