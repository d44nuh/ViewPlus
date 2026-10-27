import type { Request, Response } from "express";
import Auditorium from "../models/auditorium.ts";
import { Op } from "sequelize";
import Showtime from "../models/showtime.ts";

export async function createAuditorium(req: Request, res: Response) {
  const { name, capacity } = req.body;
  const auditorium = await Auditorium.create({ name, capacity });
  res.status(201).json(auditorium);
}

export async function getAuditoriums(_req: Request, res: Response) {
  const auditoriums = await Auditorium.findAll();
  res.status(200).json(auditoriums);
}

export async function getAuditoriumById(req: Request, res: Response) {
  const auditorium = await Auditorium.findByPk(Number(req.params.id));
  if (!auditorium) {
    res.status(404).json({ message: "Auditorium not found" });
    return;
  }
  res.status(200).json(auditorium);
}

export async function updateAuditorium(req: Request, res: Response) {
  const auditorium = await Auditorium.findByPk(Number(req.params.id));
  if (!auditorium) {
    res.status(404).json({ message: "Auditorium not found" });
    return;
  }
  const { name, capacity } = req.body;
  await auditorium.update({ name, capacity });
  res.status(200).json(auditorium);
}

export async function deleteAuditorium(req: Request, res: Response) {
  const auditorium = await Auditorium.findByPk(Number(req.params.id));
  if (!auditorium) {
    res.status(404).json({ message: "Auditorium not found" });
    return;
  }
  const activeShowtimes = await Showtime.count({
    where: { auditoriumId: auditorium.id, endTime: { [Op.gt]: new Date() } },
  });
  if (activeShowtimes > 0) {
    res
      .status(409)
      .json({ message: "Auditorium has active or future showtimes" });
    return;
  }
  await auditorium.destroy();
  res.status(204).send();
}