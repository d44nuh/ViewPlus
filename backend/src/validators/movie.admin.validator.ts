import { body } from 'express-validator';

export const movieBodyValidator = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('synopsis').trim().notEmpty().withMessage('Synopsis is required'),
  body('durationMinutes')
    .isInt({ min: 1 })
    .withMessage('Duration must be a positive integer in minutes'),
  body('genre').trim().notEmpty().withMessage('Genre is required'),
  body('rating').trim().notEmpty().withMessage('Rating is required'),
  body('status')
    .optional()
    .isIn(['cartelera', 'proximamente', 'finalizada'])
    .withMessage('Status must be: cartelera, proximamente, or finalizada'),
  body('releaseDate')
    .optional({ values: 'null' })
    .isISO8601()
    .withMessage('Invalid date format. Must be YYYY-MM-DD'),
  body('posterUrl')
    .optional({ values: 'null' })
    .isString()
    .withMessage('Poster URL must be a string'),
];