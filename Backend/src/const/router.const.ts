import { Router } from "express";
import { productsRouter } from "../routes/products.routes";
import { ordersRouter } from "../routes/orders.routes";
export const globalRouter = Router();

globalRouter.use("/products", productsRouter);
globalRouter.use("/orders", ordersRouter);
