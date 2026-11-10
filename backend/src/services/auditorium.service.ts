import { Op } from 'sequelize';
import { Auditorium } from '../models/auditorium.model.ts';
import { Showtime } from '../models/showtime.model.ts';
import { HttpError } from './http.error.ts';

export interface AuditoriumData {
  name: string;
  capacity: number;
}

export class AuditoriumService {
  public async create(data: AuditoriumData) {
    return Auditorium.create(data);
  }

  public async findAll() {
    return Auditorium.findAll();
  }

  public async findById(id: number) {
    return Auditorium.findByPk(id);
  }

  public async update(id: number, data: AuditoriumData) {
    const auditorium = await Auditorium.findByPk(id);
    if (!auditorium) {
      return null;
    }
    return auditorium.update(data);
  }

  public async delete(id: number) {
    const auditorium = await Auditorium.findByPk(id);
    if (!auditorium) {
      return false;
    }
    const activeShowtimes = await Showtime.count({
      where: { auditoriumId: auditorium.id, endTime: { [Op.gt]: new Date() } },
    });
    if (activeShowtimes > 0) {
      throw new HttpError(409, 'Auditorium has active or future showtimes');
    }
    await auditorium.destroy();
    return true;
  }
}