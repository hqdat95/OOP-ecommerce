import express from 'express';

const router = express.Router();

import ProductController from '../../controllers/product.controller';

router.get('/', ProductController.findAll);

router.post('/create', ProductController.create);

export default router;
