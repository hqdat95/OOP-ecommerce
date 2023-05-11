import express from 'express';

const router = express.Router();

import userRouter from './users.routes';

router.use('/users', userRouter);

export default router;
