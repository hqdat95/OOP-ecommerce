import { Op } from 'sequelize';
import db from '../models/index';
import ErrorHandler from '../helper/error.helper';

class CategoryService {
  async findAll() {
    const categories = await db.Category.findAll({
      where: {
        [Op.or]: [{ deletedAt: { [Op.eq]: null } }, { deletedAt: { [Op.ne]: null } }],
      },
      paranoid: false,
      order: [['parentId', 'ASC']],
    });

    return categories;
  }

  async create(data) {
    const isExist = await db.Category.findOne({
      where: {
        name: data.name,
        parentId: data.parentId,
      },
    });

    if (isExist) {
      throw new ErrorHandler('Category name already exists', 401);
    }

    const category = await db.Category.create({
      name: data.name,
      parentId: data.parentId,
    });

    return category;
  }
}

export default new CategoryService();
