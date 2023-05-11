import express from 'express';

const router = express.Router();

import userRouter from './users.routes';
import authRouter from './auth.routes';

router.use('/users', userRouter);
router.use('/auth', authRouter);

export default router;
