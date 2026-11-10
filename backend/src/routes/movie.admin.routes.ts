import { Router } from 'express';
import { MovieAdminController } from '../controllers/movie.admin.controller.ts';
import { validate } from '../middlewares/validate.middleware.ts';
import { movieBodyValidator } from '../validators/movie.admin.validator.ts';
import { idParamValidator } from '../validators/id.validator.ts';

const router = Router();
const movieController = new MovieAdminController();

router.post('/', movieBodyValidator, validate, movieController.create);
router.get('/', movieController.getAll);
router.get('/:id', idParamValidator, validate, movieController.getById);
router.put(
  '/:id',
  idParamValidator,
  movieBodyValidator,
  validate,
  movieController.update,
);
router.delete('/:id', idParamValidator, validate, movieController.remove);

export default router;