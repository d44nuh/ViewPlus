import { Router } from 'express';
import { ShowtimeController } from '../controllers/showtime.controller.ts';
import { validate } from '../middlewares/validate.middleware.ts';
import { idParamValidator } from '../validators/id.validator.ts';
import { showtimeBodyValidator } from '../validators/showtime.validator.ts';

const router = Router();
const showtimeController = new ShowtimeController();

router.post('/', showtimeBodyValidator, validate, showtimeController.create);
router.get('/', showtimeController.getAll);
router.get('/:id', idParamValidator, validate, showtimeController.getById);
router.put(
  '/:id',
  idParamValidator,
  showtimeBodyValidator,
  validate,
  showtimeController.update,
);
router.delete('/:id', idParamValidator, validate, showtimeController.remove);

export default router;