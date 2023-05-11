import AuthService from '../services/auth.service';
import ErrorHandler from '../helper/error.helper';

class AuthController {
  async login(req, res, next) {
    try {
      const { grant_type, email, password, refresh_token } = req.body;

      switch (grant_type) {
        case 'local':
          const token = await AuthService.localLogin(email, password);
          res.success({ token });
          break;

        case 'refresh_token':
          const newAccessToken = await AuthService.refreshToken(refresh_token);
          res.success({ access_token: newAccessToken });
          break;

        default:
          throw new ErrorHandler('Invalid grant type', 400);
      }
    } catch (err) {
      return next(err);
    }
  }
}

export default new AuthController();
