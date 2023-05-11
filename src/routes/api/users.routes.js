import express from 'express';
import UserController from '../../controllers/users.controller';
import ValidateSchema from '../../middlewares/validator.middleware';

const router = express.Router();

router.get('/', UserController.findAll);
router.get('/active', UserController.findAllActive);
router.get('/removed', UserController.findAllRemoved);
router.get('/:id', UserController.findById);
router.get('/removed/:id', UserController.findRemoved);

router.post('/', ValidateSchema.validateRegister, UserController.register);

router.put('/:id', ValidateSchema.validateUpdate, UserController.update);

router.delete('/:id', UserController.remove);

router.put('/restore/:id', UserController.restore);

export default router;
