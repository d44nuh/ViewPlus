import { Op } from 'sequelize';
import { Auditorium } from '../models/auditorium.model.ts';
import { Movie } from '../models/movie.admin.model.ts';
import { Showtime } from '../models/showtime.model.ts';
import { HttpError } from './http.error.ts';

export const CLEANING_BUFFER_MINUTES = 15;

export interface ShowtimeData {
  movieId: number;
  auditoriumId: number;
  startTime: string;
}

export function calculateEndTime(startTime: Date, durationMinutes: number) {
  const totalMinutes = durationMinutes + CLEANING_BUFFER_MINUTES;
  return new Date(startTime.getTime() + totalMinutes * 60000);
}

export class ShowtimeService {
  private async buildSchedule(data: ShowtimeData, ignoreId: number) {
    const movie = await Movie.findByPk(data.movieId);
    const auditorium = await Auditorium.findByPk(data.auditoriumId);
    if (!movie || !auditorium) {
      throw new HttpError(404, 'Movie or auditorium not found');
    }

    const startTime = new Date(data.startTime);
    if (startTime <= new Date()) {
      throw new HttpError(400, 'Showtime cannot be in the past');
    }

    const endTime = calculateEndTime(startTime, movie.durationMinutes);
    const overlaps = await Showtime.count({
      where: {
        auditoriumId: auditorium.id,
        id: { [Op.ne]: ignoreId },
        startTime: { [Op.lt]: endTime },
        endTime: { [Op.gt]: startTime },
      },
    });
    if (overlaps > 0) {
      throw new HttpError(
        409,
        'Showtime overlaps with another showtime in this auditorium',
      );
    }

    return {
      movieId: movie.id,
      auditoriumId: auditorium.id,
      startTime,
      endTime,
    };
  }

  public async create(data: ShowtimeData) {
    const schedule = await this.buildSchedule(data, 0);
    return Showtime.create(schedule);
  }

  public async findAll() {
    return Showtime.findAll({ order: [['startTime', 'ASC']] });
  }

  public async findById(id: number) {
    return Showtime.findByPk(id);
  }

  public async update(id: number, data: ShowtimeData) {
    const showtime = await Showtime.findByPk(id);
    if (!showtime) {
      return null;
    }
    const schedule = await this.buildSchedule(data, showtime.id);
    return showtime.update(schedule);
  }

  public async delete(id: number) {
    const showtime = await Showtime.findByPk(id);
    if (!showtime) {
      return false;
    }
    await showtime.destroy();
    return true;
  }
}