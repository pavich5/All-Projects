import { Router } from "express";
import { ProductController } from "../controller/products.controller";
import { catchAsync } from "../utils/catchAsync";

export const productsRouter = Router();

productsRouter.get("/", ProductController.getAllProducts);
productsRouter.get("/:id", catchAsync(ProductController.findProductById));
productsRouter.post("/", ProductController.createProduct);
productsRouter.patch("/:id", catchAsync(ProductController.updateProduct));
productsRouter.delete("/delete/:id",ProductController.deleteProduct)