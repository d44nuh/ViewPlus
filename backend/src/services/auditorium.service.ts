import { Auditorium } from '../models/auditorium.model.ts';

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
    await auditorium.destroy();
    return true;
  }
}