import { Op } from 'sequelize';
import db from '../models/index';
import ErrorHandler from '../helper/error.helper';

class UserService {
  async findAll() {
    const users = await db.User.findAll({
      where: {
        [Op.or]: [{ deletedAt: { [Op.eq]: null } }, { deletedAt: { [Op.ne]: null } }],
      },
      paranoid: false,
      order: [['deletedAt', 'ASC']],
    });

    return users;
  }

  async findAllActive() {
    return db.User.findAll({
      order: [['fullName', 'ASC']],
    });
  }

  async findAllRemoved() {
    return db.User.findAll({
      where: { deletedAt: { [Op.not]: null } },
      paranoid: false,
      order: [['fullName', 'ASC']],
    });
  }

  async findById(id) {
    const user = await db.User.findByPk(id);
    if (!user) {
      throw new ErrorHandler('User Not Found', 404);
    }

    return user;
  }

  async findRemoved(id) {
    const user = await db.User.findOne({
      where: { id, deletedAt: { [Op.not]: null } },
      paranoid: false,
    });

    if (!user) {
      throw new ErrorHandler('User Not Found', 404);
    }

    return user;
  }

  async create(data) {
    const isExist = await db.User.count({ where: { email: data.email } });

    if (isExist) {
      throw new ErrorHandler('Email already exist!', 401);
    }

    return db.User.create({
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      role: data.role,
    });
  }

  async update(id, data) {
    const user = await this.findById(id);
    await user.update({ fullName: data.fullName });

    return user;
  }

  async remove(id) {
    const user = await this.findById(id);

    return user.destroy();
  }

  async restore(id) {
    const user = await this.findRemoved(id);

    await db.User.restore({
      where: { id: user.id },
    });

    return user;
  }
}

export default new UserService();
