import { query } from 'express-validator';

export const billboardFilterValidator = [
  query('genre')
    .optional()
    .isString().withMessage('Genre must be a string'),
  
  query('date')
    .optional()
    .isISO8601().withMessage('Invalid date format. Must be YYYY-MM-DD'),
  
  query('status')
    .optional()
    .isIn(['cartelera', 'proximamente', 'finalizada'])
    .withMessage('Status must be: cartelera, proximamente, or finalizada'),
  
  query('search')
    .optional()
    .isString().withMessage('Search term must be a string')
];