import type { Request, Response } from "express";
import Movie from "../models/movie.ts";
import { Op } from "sequelize";
import Showtime from "../models/showtime.ts";

export async function createMovie(req: Request, res: Response) {
  const { title, duration, genre, rating, synopsis, posterUrl, isActive } =
    req.body;
  const movie = await Movie.create({
    title,
    duration,
    genre,
    rating,
    synopsis,
    posterUrl,
    isActive,
  });
  res.status(201).json(movie);
}

export async function getMovies(_req: Request, res: Response) {
  const movies = await Movie.findAll();
  res.status(200).json(movies);
}

export async function getMovieById(req: Request, res: Response) {
  const movie = await Movie.findByPk(Number(req.params.id));
  if (!movie) {
    res.status(404).json({ message: "Movie not found" });
    return;
  }
  res.status(200).json(movie);
}

export async function updateMovie(req: Request, res: Response) {
  const movie = await Movie.findByPk(Number(req.params.id));
  if (!movie) {
    res.status(404).json({ message: "Movie not found" });
    return;
  }
  const { title, duration, genre, rating, synopsis, posterUrl, isActive } =
    req.body;
  await movie.update({
    title,
    duration,
    genre,
    rating,
    synopsis,
    posterUrl,
    isActive,
  });
  res.status(200).json(movie);
}

export async function deleteMovie(req: Request, res: Response) {
  const movie = await Movie.findByPk(Number(req.params.id));
  if (!movie) {
    res.status(404).json({ message: "Movie not found" });
    return;
  }
  const activeShowtimes = await Showtime.count({
    where: { movieId: movie.id, endTime: { [Op.gt]: new Date() } },
  });
  if (activeShowtimes > 0) {
    res.status(409).json({ message: "Movie has active or future showtimes" });
    return;
  }
  await movie.destroy();
  res.status(204).send();
}