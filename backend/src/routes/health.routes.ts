import { Router } from 'express';
import { getHealthStatus } from '../controllers/health.controllers.ts';

const router = Router();

router.get('/health', getHealthStatus);

export default router;