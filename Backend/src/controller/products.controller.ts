import { ProductModel } from "../models/products-model";
import { Request, Response } from "express";

export class ProductController {
  static async getAllProducts(req: Request, res: Response) {
    try {
      const allProducts = await ProductModel.getAllProducts();
      res.json(allProducts);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }
  static async findProductById(req: Request, res: Response) {
    const { id } = req.params;
    const foundProduct = await ProductModel.findProductById(Number(id));
    res.json(foundProduct);
  }
  static async createProduct(req: Request, res: Response) {
    try {
      const productData = req.body;
      const newProduct = await ProductModel.createProduct(productData);
      res.json(newProduct);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }
  static async updateProduct(req: Request, res: Response) {
    const productData = req.body;
    const { id } = req.params;
    const updatedProduct = await ProductModel.updateProduct(productData, Number(id));
    res.json(updatedProduct);
  }
  static async deleteProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await ProductModel.deleteProduct(Number(id));
      res.sendStatus(201);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }
}
