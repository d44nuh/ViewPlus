import { Router } from 'express';
import { MovieController } from '../controllers/movie.controller.ts';
import { billboardFilterValidator } from '../validators/movie.validator.ts';
import { validate } from '../middlewares/validate.middleware.ts';

const router = Router();
const movieController = new MovieController();

router.get(
  '/',
  billboardFilterValidator,
  validate,
  movieController.getFilteredMovies
);

export default router;