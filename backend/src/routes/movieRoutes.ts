import { Router } from "express";
import {
  createMovie,
  deleteMovie,
  getMovieById,
  getMovies,
  updateMovie,
} from "../controllers/movieController.ts";
import {
  handleValidation,
  idRule,
  movieBodyRules,
} from "../middlewares/movieValidation.ts";

const router = Router();

router.get("/", getMovies);
router.get("/:id", idRule, handleValidation, getMovieById);
router.post("/", movieBodyRules, handleValidation, createMovie);
router.put("/:id", idRule, movieBodyRules, handleValidation, updateMovie);
router.delete("/:id", idRule, handleValidation, deleteMovie);

export default router;