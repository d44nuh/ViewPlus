import { param } from 'express-validator';

export const idParamValidator = param('id')
  .isInt({ min: 1 })
  .withMessage('Id must be a positive integer');