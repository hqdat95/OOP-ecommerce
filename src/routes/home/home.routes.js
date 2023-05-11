import express from 'express';

const router = express.Router();

import HomeController from '../../controllers/home.controller';
import AuthMiddleware from '../../middlewares/verify.middleware';

router.get('/', HomeController.homePage);

router.get('/about', AuthMiddleware.verifyAccessToken, HomeController.aboutPage);

export default router;
