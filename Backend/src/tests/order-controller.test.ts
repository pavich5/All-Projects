const axios = require('axios');

const url = 'http://127.0.0.1:4000/api/orders';

describe('Order controller', () => {
  test('Create an order', async () => {
    const orderData = {
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
      ],
    };
  
    const res = await axios.post(url, orderData);
  
    expect(res).toBeTruthy();
    expect(res.status).toBe(200);
  });
  
  test('Get an order by ID', async () => {
    const orderId = 1;
    const res = await axios.get(`${url}/${orderId}`);
    expect(res).toBeTruthy();
    expect(res.status).toBe(200);
    expect(res.data).toHaveProperty('useremail');
    expect(res.data).toHaveProperty('products');
    expect(Array.isArray(res.data.products)).toBe(true);
  });


    test('The get route', async () => {
    const res = await axios.get(url);
    expect(res).toBeTruthy();
    expect(res.status).toBe(200);
    expect(Array.isArray(res.data.allOrders)).toBe(true); 
  
    res.data.allOrders.forEach(order => {
      expect(order).toHaveProperty('useremail');
      expect(order).toHaveProperty('products');
    });
  });
 
  })
  
