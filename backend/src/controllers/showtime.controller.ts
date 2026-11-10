import type { Request, Response } from 'express';
import { HttpError } from '../services/http.error.ts';
import { ShowtimeService } from '../services/showtime.service.ts';
import type { ShowtimeData } from '../services/showtime.service.ts';

export class ShowtimeController {
  private showtimeService: ShowtimeService;

  constructor() {
    this.showtimeService = new ShowtimeService();
  }

  private getData(req: Request): ShowtimeData {
    const { movieId, auditoriumId, startTime } = req.body;
    return { movieId, auditoriumId, startTime };
  }

  private sendError(res: Response, error: any): void {
    if (error instanceof HttpError) {
      res.status(error.status).json({ success: false, message: error.message });
      return;
    }
    res.status(500).json({
      success: false,
      message: 'Error processing request',
      error: error.message,
    });
  }

  public create = async (req: Request, res: Response): Promise<void> => {
    try {
      const showtime = await this.showtimeService.create(this.getData(req));
      res.status(201).json({
        success: true,
        message: 'Showtime created successfully',
        data: showtime,
      });
    } catch (error: any) {
      this.sendError(res, error);
    }
  };

  public getAll = async (_req: Request, res: Response): Promise<void> => {
    try {
      const showtimes = await this.showtimeService.findAll();
      res.status(200).json({
        success: true,
        message: 'Showtimes retrieved successfully',
        total: showtimes.length,
        data: showtimes,
      });
    } catch (error: any) {
      this.sendError(res, error);
    }
  };

  public getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const showtime = await this.showtimeService.findById(
        Number(req.params.id),
      );
      if (!showtime) {
        res.status(404).json({ success: false, message: 'Showtime not found' });
        return;
      }
      res.status(200).json({
        success: true,
        message: 'Showtime retrieved successfully',
        data: showtime,
      });
    } catch (error: any) {
      this.sendError(res, error);
    }
  };

  public update = async (req: Request, res: Response): Promise<void> => {
    try {
      const showtime = await this.showtimeService.update(
        Number(req.params.id),
        this.getData(req),
      );
      if (!showtime) {
        res.status(404).json({ success: false, message: 'Showtime not found' });
        return;
      }
      res.status(200).json({
        success: true,
        message: 'Showtime updated successfully',
        data: showtime,
      });
    } catch (error: any) {
      this.sendError(res, error);
    }
  };

  public remove = async (req: Request, res: Response): Promise<void> => {
    try {
      const deleted = await this.showtimeService.delete(Number(req.params.id));
      if (!deleted) {
        res.status(404).json({ success: false, message: 'Showtime not found' });
        return;
      }
      res.status(204).send();
    } catch (error: any) {
      this.sendError(res, error);
    }
  };
}