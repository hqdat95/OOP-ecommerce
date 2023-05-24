import express from 'express';
import AuthController from '../../controllers/auth.controller';

const router = express.Router();

router.post('/login', AuthController.login);

router.get('/google/callback', AuthController.googleCallback);

export default router;
