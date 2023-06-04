import express from 'express';

const router = express.Router();

import userRouter from './users.routes';

import productRouter from './product.routes';
import categoryRouter from './categories.routes';

router.use('/users', userRouter);

router.use('/categories', categoryRouter);
router.use('/product', productRouter);

export default router;
