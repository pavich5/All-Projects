import request from "supertest";
import app from "../app";
const axios = require("axios");
const url = "http://127.0.0.1:4000/api/products";

it("should delete a product by ID", async () => {
    const productID = 11;
    const res = await axios.delete(`${url}/${productID}`);
    expect(res.status).toBe(200 || 204);
});

test("Get an Product by ID", async () => {
  const orderId = 15;
  const res = await axios.get(`${url}/${orderId}`);
  expect(res.status).toBe(200);
});
it("should create a new product", async () => {
  const newProduct = {
    name: "Test Product",
    description: "A test product",
    price: 9.99,
    image: "test.jpg",
    brand: "Test Brand",
    servings: 5,
    flavor: "Test Flavor",
  };
  try {
    const res = await axios.post(url, newProduct);
    expect(res).toBeTruthy();
    expect(res.status).toBe(200);
    const createdProduct = res.data;
    expect(createdProduct.id).toBeDefined();
    expect(createdProduct.name).toBe(newProduct.name);
  } catch (error) {
    console.error("Error creating a new product:", error);
  }
});

// it("should update a product by ID", async () => {
//   const updatedProductData = {
//     // Define the updated product data here
//   };

//   const response = await request(app)
//     .put(`/api/products/3`)
//     .send(updatedProductData)
//     .expect(200);

//   // Add expectations to verify the updated product data
// });
