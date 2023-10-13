import { OrdersModel } from '../models/orders-model';
import { dataSource } from '../app.data-source';
import { OrderEntity } from '../entites/order.entity';

describe('OrdersModel', () => {

  it('should get all orders for a user', async () => {
    const userEmail = 'test@example.com';
    const data = await OrdersModel.getAllOrders(userEmail);
    expect(data.allOrders).toHaveLength(0); 
  });
  

  it('should get an order by ID', async () => {
    const orderId = 1;
    const data = await OrdersModel.getOrderById(orderId);
    expect(data).toHaveProperty('useremail');
    expect(data).toHaveProperty('products');
  });

  it('should create a new order', async () => {
    const newOrder = {
      id: 1121,
      useremail: 'test@example.com',
      products: [
        {
          id: 1,
          name: 'Product A',
          
        },
        {
          id: 2,
          name: 'Product B',
        },
      ]
  }
    const data = await OrdersModel.createOrder(newOrder);
    expect(data).toHaveProperty('useremail');
    expect(data).toHaveProperty('products');
});
});
