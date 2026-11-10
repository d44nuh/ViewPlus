import { body } from 'express-validator';

export const loginValidationRules = [
  body('email').notEmpty().withMessage('El correo es requerido.').isEmail().withMessage('Formato de correo inválido.'),
  body('password').notEmpty().withMessage('La contraseña es requerida.'),
];