import { Router } from "express";
import { OrdersController } from "../controller/orders.controller";

export const ordersRouter = Router();

ordersRouter.get("/", OrdersController.getAllOrders);
ordersRouter.post("/", OrdersController.createOrder);
ordersRouter.get("/:id", OrdersController.getOrderByID);

