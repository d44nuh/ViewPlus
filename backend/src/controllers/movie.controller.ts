import type { Request, Response } from 'express';
import { MovieService } from '../services/movie.service.ts';

export class MovieController {
  private movieService: MovieService;

  constructor() {
    this.movieService = new MovieService();
  }

  public getFilteredMovies = async (req: Request, res: Response): Promise<void> => {
    try {
      const { genre, date, status, search } = req.query;

      const movies = await this.movieService.getFilteredMovies({
        genre: genre as string,
        date: date as string,
        status: status as string,
        search: search as string
      });

      res.status(200).json({
        success: true,
        message: 'Billboard retrieved successfully',
        total: movies.length,
        data: movies
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Error processing request',
        error: error.message
      });
    }
  };
}