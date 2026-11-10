import type { Request, Response } from 'express';
import { MovieAdminService } from '../services/movie.admin.service.ts';
import type { MovieData } from '../services/movie.admin.service.ts';

export class MovieAdminController {
  private movieService: MovieAdminService;

  constructor() {
    this.movieService = new MovieAdminService();
  }

  private getData(req: Request): MovieData {
    const {
      title,
      synopsis,
      durationMinutes,
      genre,
      rating,
      status,
      releaseDate,
      posterUrl,
    } = req.body;
    return {
      title,
      synopsis,
      durationMinutes,
      genre,
      rating,
      status: status ?? 'proximamente',
      releaseDate: releaseDate ?? null,
      posterUrl: posterUrl ?? null,
    };
  }

  public create = async (req: Request, res: Response): Promise<void> => {
    try {
      const movie = await this.movieService.create(this.getData(req));
      res.status(201).json({
        success: true,
        message: 'Movie created successfully',
        data: movie,
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
      const movies = await this.movieService.findAll();
      res.status(200).json({
        success: true,
        message: 'Movies retrieved successfully',
        total: movies.length,
        data: movies,
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
      const movie = await this.movieService.findById(Number(req.params.id));
      if (!movie) {
        res.status(404).json({ success: false, message: 'Movie not found' });
        return;
      }
      res.status(200).json({
        success: true,
        message: 'Movie retrieved successfully',
        data: movie,
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
      const movie = await this.movieService.update(
        Number(req.params.id),
        this.getData(req),
      );
      if (!movie) {
        res.status(404).json({ success: false, message: 'Movie not found' });
        return;
      }
      res.status(200).json({
        success: true,
        message: 'Movie updated successfully',
        data: movie,
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
      const deleted = await this.movieService.delete(Number(req.params.id));
      if (!deleted) {
        res.status(404).json({ success: false, message: 'Movie not found' });
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