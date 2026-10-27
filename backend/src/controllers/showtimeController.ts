import { Op } from "sequelize";
import type { Request, Response } from "express";
import Auditorium from "../models/auditorium.ts";
import Movie from "../models/movie.ts";
import Showtime from "../models/showtime.ts";

const CLEANING_BUFFER_MINUTES = 15;

function calculateEndTime(startTime: Date, durationMinutes: number) {
  const totalMinutes = durationMinutes + CLEANING_BUFFER_MINUTES;
  return new Date(startTime.getTime() + totalMinutes * 60000);
}

async function hasOverlap(
  auditoriumId: number,
  startTime: Date,
  endTime: Date,
  ignoreId: number,
) {
  const count = await Showtime.count({
    where: {
      auditoriumId,
      id: { [Op.ne]: ignoreId },
      startTime: { [Op.lt]: endTime },
      endTime: { [Op.gt]: startTime },
    },
  });
  return count > 0;
}

async function getShowtimeError(
  startTime: Date,
  endTime: Date,
  auditoriumId: number,
  ignoreId: number,
) {
  if (startTime <= new Date()) {
    return { status: 400, message: "Showtime cannot be in the past" };
  }
  if (await hasOverlap(auditoriumId, startTime, endTime, ignoreId)) {
    return {
      status: 409,
      message: "Showtime overlaps with another showtime in this auditorium",
    };
  }
  return null;
}

export async function createShowtime(req: Request, res: Response) {
  const { movieId, auditoriumId, startTime } = req.body;
  const movie = await Movie.findByPk(movieId);
  const auditorium = await Auditorium.findByPk(auditoriumId);
  if (!movie || !auditorium) {
    res.status(404).json({ message: "Movie or auditorium not found" });
    return;
  }
  const start = new Date(startTime);
  const end = calculateEndTime(start, movie.duration);
  const error = await getShowtimeError(start, end, auditorium.id, 0);
  if (error) {
    res.status(error.status).json({ message: error.message });
    return;
  }
  const showtime = await Showtime.create({
    movieId: movie.id,
    auditoriumId: auditorium.id,
    startTime: start,
    endTime: end,
  });
  res.status(201).json(showtime);
}

export async function getShowtimes(_req: Request, res: Response) {
  const showtimes = await Showtime.findAll();
  res.status(200).json(showtimes);
}

export async function getShowtimeById(req: Request, res: Response) {
  const showtime = await Showtime.findByPk(Number(req.params.id));
  if (!showtime) {
    res.status(404).json({ message: "Showtime not found" });
    return;
  }
  res.status(200).json(showtime);
}

export async function updateShowtime(req: Request, res: Response) {
  const showtime = await Showtime.findByPk(Number(req.params.id));
  if (!showtime) {
    res.status(404).json({ message: "Showtime not found" });
    return;
  }
  const { movieId, auditoriumId, startTime } = req.body;
  const movie = await Movie.findByPk(movieId);
  const auditorium = await Auditorium.findByPk(auditoriumId);
  if (!movie || !auditorium) {
    res.status(404).json({ message: "Movie or auditorium not found" });
    return;
  }
  const start = new Date(startTime);
  const end = calculateEndTime(start, movie.duration);
  const error = await getShowtimeError(start, end, auditorium.id, showtime.id);
  if (error) {
    res.status(error.status).json({ message: error.message });
    return;
  }
  await showtime.update({
    movieId: movie.id,
    auditoriumId: auditorium.id,
    startTime: start,
    endTime: end,
  });
  res.status(200).json(showtime);
}

export async function deleteShowtime(req: Request, res: Response) {
  const showtime = await Showtime.findByPk(Number(req.params.id));
  if (!showtime) {
    res.status(404).json({ message: "Showtime not found" });
    return;
  }
  await showtime.destroy();
  res.status(204).send();
}