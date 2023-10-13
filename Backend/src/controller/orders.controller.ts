import { OrdersModel } from "../models/orders-model";
import { Request, Response } from "express";
export class OrdersController {
    static async getAllOrders(req:Request, res:Response) {
        try {
            const userEmail = req.query.useremail; 
            const allOrders = await OrdersModel.getAllOrders(userEmail);
            res.json(allOrders)
          } catch (error) {
            console.log(error);
            return res.sendStatus(500);
          }
    }
    static async getOrderByID(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const foundOrder = await OrdersModel.getOrderById(Number(id));
            res.json(foundOrder);
        }
        catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }
    }
    static async createOrder(req: Request, res: Response) {
        try {
            const newOrder = await OrdersModel.createOrder(req.body);
            res.json(newOrder);
        }
        catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }
    }
}
