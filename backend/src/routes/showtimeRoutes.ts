import { Router } from "express";
import {
  createShowtime,
  deleteShowtime,
  getShowtimeById,
  getShowtimes,
  updateShowtime,
} from "../controllers/showtimeController.ts";
import { handleValidation, idRule } from "../middlewares/movieValidation.ts";
import { showtimeBodyRules } from "../middlewares/showtimeValidation.ts";

const router = Router();

router.get("/", getShowtimes);
router.get("/:id", idRule, handleValidation, getShowtimeById);
router.post("/", showtimeBodyRules, handleValidation, createShowtime);
router.put(
  "/:id",
  idRule,
  showtimeBodyRules,
  handleValidation,
  updateShowtime,
);
router.delete("/:id", idRule, handleValidation, deleteShowtime);

export default router;