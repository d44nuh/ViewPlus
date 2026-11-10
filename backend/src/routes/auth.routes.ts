import { Router } from 'express';
import { login } from '../controllers/auth.controller.js';
import { loginValidationRules } from '../validators/auth.validators.js';
import { validateRequest } from '../middlewares/validateRequest.js';

const router = Router();

router.post('/login', loginValidationRules, validateRequest, login);

export default router;