import express from 'express';

const router = express.Router();

import HomeController from '../../controllers/home.controller';

router.get('/', HomeController.homePage);

router.get('/about', HomeController.aboutPage);

export default router;
