import { Op } from 'sequelize';
import { Movie } from '../models/movie.admin.model.ts';
import { Showtime } from '../models/showtime.model.ts';
import { HttpError } from './http.error.ts';

export interface MovieData {
  title: string;
  synopsis: string;
  durationMinutes: number;
  genre: string;
  rating: string;
  status: 'cartelera' | 'proximamente' | 'finalizada';
  releaseDate: string | null;
  posterUrl: string | null;
}

export class MovieAdminService {
  public async create(data: MovieData) {
    return Movie.create(data);
  }

  public async findAll() {
    return Movie.findAll();
  }

  public async findById(id: number) {
    return Movie.findByPk(id);
  }

  public async update(id: number, data: MovieData) {
    const movie = await Movie.findByPk(id);
    if (!movie) {
      return null;
    }
    return movie.update(data);
  }

  public async delete(id: number) {
    const movie = await Movie.findByPk(id);
    if (!movie) {
      return false;
    }
    const activeShowtimes = await Showtime.count({
      where: { movieId: movie.id, endTime: { [Op.gt]: new Date() } },
    });
    if (activeShowtimes > 0) {
      throw new HttpError(409, 'Movie has active or future showtimes');
    }
    await movie.destroy();
    return true;
  }
}