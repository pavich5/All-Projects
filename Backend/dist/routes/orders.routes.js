"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordersRouter = void 0;
var express_1 = require("express");
var orders_controller_1 = require("../controller/orders.controller");
exports.ordersRouter = (0, express_1.Router)();
exports.ordersRouter.get("/", orders_controller_1.OrdersController.getAllOrders);
exports.ordersRouter.post("/", orders_controller_1.OrdersController.createOrder);
exports.ordersRouter.get("/:id", orders_controller_1.OrdersController.getOrderByID);
