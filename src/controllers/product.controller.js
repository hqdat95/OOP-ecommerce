import ProductService from '../services/product.service';

class ProductController {
  async findAll(req, res, next) {
    try {
      const products = await ProductService.findAll();

      res.success(products);
    } catch (err) {
      return next(err);
    }
  }

  async create(req, res, next) {
    try {
      const data = req.body;

      const product = await ProductService.create(data);

      res.success(product);
    } catch (err) {
      return next(err);
    }
  }
}

export default new ProductController();
