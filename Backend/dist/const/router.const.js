"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalRouter = void 0;
var express_1 = require("express");
var products_routes_1 = require("../routes/products.routes");
var orders_routes_1 = require("../routes/orders.routes");
exports.globalRouter = (0, express_1.Router)();
exports.globalRouter.use("/products", products_routes_1.productsRouter);
exports.globalRouter.use("/orders", orders_routes_1.ordersRouter);
