import AuthService from '../services/auth.service';
import ErrorHandler from '../helper/error.helper';

class AuthController {
  async login(req, res, next) {
    try {
      const { grant_type, email, password, refresh_token, code } = req.body;
      let token;

      switch (grant_type) {
        case 'local':
          token = await AuthService.localLogin(email, password);
          res.success({ token });
          break;

        case 'refresh_token':
          token = await AuthService.refreshToken(refresh_token);
          res.success({ access_token: token });
          break;

        // case 'google':
        //   token = await AuthService.googleLogin(code);
        //   res.success({ token });
        //   break;

        default:
          throw new ErrorHandler('Invalid grant type', 400);
      }
    } catch (err) {
      return next(err);
    }
  }

  async googleCallback(req, res, next) {
    try {
      const code = req.query;

      const token = await AuthService.googleLogin(code);

      res.success({ token });
    } catch (err) {
      return next(err);
    }
  }
}

export default new AuthController();
