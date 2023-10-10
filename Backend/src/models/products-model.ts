import { dataSource } from "../app.data-source";
import { ProductEntity } from "../entites/product.entity";
import { UpdateProductsEntity } from "../entites/update-product.entity";
import { CustomError } from "../utils/customError";

export class ProductModel {
  static async getAllProducts() {
    const productsRepo = dataSource.getRepository(ProductEntity);
    const allProducts = await productsRepo.find({});
    const productsCount = await productsRepo.createQueryBuilder().getCount();

    return { allProducts, productsCount };
  }
  static async findProductById(productId: number) {
    const productsRepo = dataSource.getRepository(ProductEntity);
    const foundProduct = productsRepo.findOne({ where: { id: productId } });
    if (!foundProduct) throw new CustomError("Product not found", 404);
    return foundProduct;
  }
  static async createProduct(productData: ProductEntity) {
    const productsRepo = dataSource.getRepository(ProductEntity);
    const newProduct = await productsRepo.insert(productData);
    return newProduct;
  }
  static async updateProduct(productData: UpdateProductsEntity, productId: Number) {
    const productsRepo = dataSource.getRepository(ProductEntity);
    const foundUser = await this.findProductById(Number(productId));
    if (foundUser.id) throw new CustomError("ID cannot be changed", 400);
    Object.assign(foundUser, productData);
    productsRepo.save(foundUser);
    return foundUser;
  }
  static async deleteProduct(productId: Number) {
    const productsRepo = dataSource.getRepository(ProductEntity);
    const foundUser = await this.findProductById(Number(productId));
    await productsRepo.remove(foundUser);
  }
}
