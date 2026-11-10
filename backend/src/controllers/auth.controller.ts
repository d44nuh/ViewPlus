import type { Request, Response } from 'express';
import { authenticateUser } from '../services/auth.service.js';

export const login = async (req: Request, res: Response) => {
  try {
    const result = await authenticateUser(req.body);
    return res.status(200).json(result);
  } catch (error: any) {
    const status = error.status || 500;
    return res.status(status).json({ message: error.message || 'Error interno' });
  }
};