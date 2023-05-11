import jwt from 'jsonwebtoken';
import config from '../config/auth';
import redis from '../config/redis';
import Payload from '../helper/payload.helper';
import ErrorHandler from '../helper/error.helper';

class TokenManager {
  async token(user, type, action) {
    const prefix = type === 'access_token' ? 'access_token' : 'refresh_token';

    let result;
    switch (action) {
      case 'sign':
        result = jwt.sign(
          Payload.format(user),
          type === 'access_token' ? config.accessTokenSecret : config.refreshTokenSecret,
          {
            expiresIn: parseInt(
              type === 'access_token' ? config.accessTokenExpiresIn : config.refreshTokenExpiresIn,
            ),
          },
        );

        await redis.set(`${prefix}:${user.id}`, result);
        await redis.expire(
          `${prefix}:${user.id}`,
          type === 'access_token' ? config.accessTokenExpiresIn : config.refreshTokenExpiresIn,
        );
        break;

      case 'get':
        result = await redis.get(`${prefix}:${user}`);
        break;

      case 'del':
        result = await redis.del(`${prefix}:${user}`);
        break;

      default:
        throw new ErrorHandler('Invalid token action', 400);
    }

    return result;
  }
}

export default new TokenManager();
