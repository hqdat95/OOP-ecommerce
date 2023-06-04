import express from 'express';

const router = express.Router();

import CategoryController from '../../controllers/categories.controller';

router.get('/', CategoryController.findAll);
router.get('/p', CategoryController.findAllParent);
router.get('/c', CategoryController.findAllChildren);

router.post('/create', CategoryController.create);

export default router;
