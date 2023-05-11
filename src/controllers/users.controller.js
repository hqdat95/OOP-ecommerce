import UserService from '../services/users.service';
import fields from '../helper/response.helper';

class UserController {
  async findAll(req, res, next) {
    try {
      const result = await UserService.findAll();
      res.success(result, fields.userFind);
    } catch (err) {
      next(err);
    }
  }

  async findAllActive(req, res, next) {
    try {
      const result = await UserService.findAllActive();
      res.success(result, fields.userFind);
    } catch (err) {
      next(err);
    }
  }

  async findAllRemoved(req, res, next) {
    try {
      const result = await UserService.findAllRemoved();
      res.success(result, fields.userFind);
    } catch (err) {
      next(err);
    }
  }

  async findById(req, res, next) {
    try {
      const { id } = req.params;
      const result = await UserService.findById(id);
      res.success(result, fields.userFind);
    } catch (err) {
      next(err);
    }
  }

  async findRemoved(req, res, next) {
    try {
      const { id } = req.params;
      const result = await UserService.findRemoved(id);
      res.success(result, fields.userFind);
    } catch (err) {
      next(err);
    }
  }

  async register(req, res, next) {
    try {
      const data = req.body;
      const result = await UserService.create(data);
      res.success(result, fields.userRegister);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const id = req.params.id;
      const data = req.body;
      const result = await UserService.update(id, data);
      res.success(result, fields.userUpdate);
    } catch (err) {
      next(err);
    }
  }

  async remove(req, res, next) {
    try {
      const id = req.params.id;
      await UserService.remove(id);
      res.success(null);
    } catch (err) {
      next(err);
    }
  }

  async restore(req, res, next) {
    try {
      const id = req.params.id;
      const result = await UserService.restore(id);
      res.success(result, fields.userRestore);
    } catch (err) {
      next(err);
    }
  }
}

export default new UserController();
