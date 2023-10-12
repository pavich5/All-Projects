import { dataSource } from "../app.data-source";
import { OrderEntity } from "../entites/order.entity";

export class OrdersModel {
    static async getAllOrders(userEmail: any) {
        const ordersRepo = dataSource.getRepository(OrderEntity);
        const allOrders = await ordersRepo.find({ where: { useremail: userEmail } });
        const ordersCount = await ordersRepo.count();
        return { allOrders, ordersCount };
      }
      
    static async getOrderById(orderId: number) {
        const ordersRepo = dataSource.getRepository(OrderEntity);
        const foundOrder = ordersRepo.findOne({ where: { id: orderId } });
        if (!foundOrder) throw new Error("Order not found");
        return foundOrder;
    }
    static async createOrder(orderData: OrderEntity) {
        const ordersRepo = dataSource.getRepository(OrderEntity);
        const newOrder = await ordersRepo.insert(orderData);
        return newOrder;
    }
}