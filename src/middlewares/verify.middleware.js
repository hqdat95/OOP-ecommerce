import jwt from 'jsonwebtoken';
import config from '../config/auth';
import db from '../models/index';
import ErrorHandler from '../helper/error.helper';
import TokenManager from '../utils/token.util';

class AuthMiddleware {
  async verifyAccessToken(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, config.accessTokenSecret);

      const user = await db.User.findOne({ where: { id: decoded.id } });

      if (!user) {
        throw new ErrorHandler('User not found', 404);
      }

      const redisAccessToken = await TokenManager.token(user.id, 'access_token', 'get');

      if (!redisAccessToken || redisAccessToken !== token) {
        throw new ErrorHandler('Invalid access token', 401);
      }

      req.user = user;

      next();
    } catch (err) {
      next(err);
    }
  }
}

export default new AuthMiddleware();
