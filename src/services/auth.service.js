import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../models/index';
import config from '../config/auth';
import ErrorHandler from '../helper/error.helper';
import TokenManager from '../utils/token.util';
import OAuth2Client from '../config/google';

class AuthService {
  async localLogin(email, password) {
    const user = await db.User.findOne({ where: { email } });

    if (!user?.password || !password || !bcrypt.compareSync(password, user.password)) {
      throw new ErrorHandler('Invalid email or password', 401);
    }

    const access_token = await TokenManager.token(user, 'access_token', 'sign');
    const refresh_token = await TokenManager.token(user, 'refresh_token', 'sign');

    return { access_token, refresh_token };
  }

  async refreshToken(refresh_token) {
    const decoded = jwt.verify(refresh_token, config.refreshTokenSecret);

    const userId = decoded.id;

    const redisRefreshToken = await TokenManager.token(userId, 'refresh_token', 'get');

    if (!redisRefreshToken || redisRefreshToken !== refresh_token) {
      throw new ErrorHandler('Invalid refresh token', 401);
    }

    await TokenManager.token(decoded.id, 'access_token', 'del');

    return TokenManager.token(decoded, 'access_token', 'sign');
  }

  async googleLogin(code) {
    const userInfo = await OAuth2Client.getGoogleUser(code);

    let user = await db.User.findOne({ where: { email: userInfo.email } });

    if (!user) {
      user = await db.User.create({
        fullName: userInfo.name,
        email: userInfo.email,
        password: '',
      });
    }

    const access_token = await TokenManager.token(user, 'access_token', 'sign');
    const refresh_token = await TokenManager.token(user, 'refresh_token', 'sign');

    return { access_token, refresh_token };
  }
}

export default new AuthService();
