import { ProductModel } from "../models/products-model";

describe("Product Model", () => {
    it('should get all products', async () => {
        const data = await ProductModel.getAllProducts();
        expect(data).not.toHaveLength(0); 
    });
    it('should get an product by ID', async () => {
        const productID = 1;
        const data = await ProductModel.findProductById(productID);
        expect(data).toHaveProperty('name');
        expect(data).toHaveProperty('price');
      });
      it('should create a new Product', async () => {
        const newProduct = {
            id: 1223,
            name: "random",
            description: "random",
            price: 1,
            image: "random",
            brand: "random",
            servings: 1,
            flavor: "random",
      }
        const data = await ProductModel.createProduct(newProduct);
        expect(data.generatedMaps).toBe(true);
        expect(data).toHaveLength(1);
    });
});