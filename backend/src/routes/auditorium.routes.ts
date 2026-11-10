import { Router } from 'express';
import { AuditoriumController } from '../controllers/auditorium.controller.ts';
import { validate } from '../middlewares/validate.middleware.ts';
import { auditoriumBodyValidator } from '../validators/auditorium.validator.ts';
import { idParamValidator } from '../validators/id.validator.ts';

const router = Router();
const auditoriumController = new AuditoriumController();

router.post('/', auditoriumBodyValidator, validate, auditoriumController.create);
router.get('/', auditoriumController.getAll);
router.get('/:id', idParamValidator, validate, auditoriumController.getById);
router.put(
  '/:id',
  idParamValidator,
  auditoriumBodyValidator,
  validate,
  auditoriumController.update,
);
router.delete('/:id', idParamValidator, validate, auditoriumController.remove);

export default router;  