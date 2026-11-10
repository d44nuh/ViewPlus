import { body } from 'express-validator';

export const showtimeBodyValidator = [
  body('movieId').isInt({ min: 1 }).withMessage('Invalid movieId'),
  body('auditoriumId').isInt({ min: 1 }).withMessage('Invalid auditoriumId'),
  body('startTime').isISO8601().withMessage('Invalid startTime'),
];