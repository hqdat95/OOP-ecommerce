import CategoryService from '../services/categories.service';
import fields from '../helper/response.helper';

class CategoryController {
  async findAll(req, res, next) {
    try {
      const categories = await CategoryService.findAll();

      res.success(categories, fields.categoryFind);
    } catch (err) {
      return next(err);
    }
  }

  async findAllParent(req, res, next) {}

  async findAllChildren(req, res, next) {}

  async create(req, res, next) {
    try {
      const data = req.body;

      const category = await CategoryService.create(data);

      res.success(category, fields.categoryCreate);
    } catch (err) {
      return next(err);
    }
  }
}

export default new CategoryController();
