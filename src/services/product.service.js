import db from '../models/index';

class ProductService {
  async findAll() {
    const products = await db.Product.findAll();

    return products;
  }

  async create(data) {
    const product = await db.Product.create({
      name: data.name,
      description: data.description,
      price: data.price,
      quantity: data.quantity,
      categoryId: data.categoryId,
    });

    return product;
  }
}

export default new ProductService();
