import type { Request, Response } from 'express';
import { AuditoriumService } from '../services/auditorium.service.ts';

export class AuditoriumController {
  private auditoriumService: AuditoriumService;

  constructor() {
    this.auditoriumService = new AuditoriumService();
  }

  public create = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, capacity } = req.body;
      const auditorium = await this.auditoriumService.create({ name, capacity });
      res.status(201).json({
        success: true,
        message: 'Auditorium created successfully',
        data: auditorium,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error processing request',
        error: error.message,
      });
    }
  };

  public getAll = async (_req: Request, res: Response): Promise<void> => {
    try {
      const auditoriums = await this.auditoriumService.findAll();
      res.status(200).json({
        success: true,
        message: 'Auditoriums retrieved successfully',
        total: auditoriums.length,
        data: auditoriums,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error processing request',
        error: error.message,
      });
    }
  };

  public getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const auditorium = await this.auditoriumService.findById(
        Number(req.params.id),
      );
      if (!auditorium) {
        res
          .status(404)
          .json({ success: false, message: 'Auditorium not found' });
        return;
      }
      res.status(200).json({
        success: true,
        message: 'Auditorium retrieved successfully',
        data: auditorium,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error processing request',
        error: error.message,
      });
    }
  };

  public update = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, capacity } = req.body;
      const auditorium = await this.auditoriumService.update(
        Number(req.params.id),
        { name, capacity },
      );
      if (!auditorium) {
        res
          .status(404)
          .json({ success: false, message: 'Auditorium not found' });
        return;
      }
      res.status(200).json({
        success: true,
        message: 'Auditorium updated successfully',
        data: auditorium,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error processing request',
        error: error.message,
      });
    }
  };

  public remove = async (req: Request, res: Response): Promise<void> => {
    try {
      const deleted = await this.auditoriumService.delete(Number(req.params.id));
      if (!deleted) {
        res
          .status(404)
          .json({ success: false, message: 'Auditorium not found' });
        return;
      }
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error processing request',
        error: error.message,
      });
    }
  };
}