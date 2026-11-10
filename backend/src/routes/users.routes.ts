import { Router } from 'express';
import { getUsuarios } from '../controllers/users.controller.ts';

const router = Router();
router.get('/usuarios', getUsuarios);
export default router;