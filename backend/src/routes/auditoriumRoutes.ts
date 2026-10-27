import { Router } from "express";
import {
  createAuditorium,
  deleteAuditorium,
  getAuditoriumById,
  getAuditoriums,
  updateAuditorium,
} from "../controllers/auditoriumController.ts";
import { auditoriumBodyRules } from "../middlewares/auditoriumValidation.ts";
import { handleValidation, idRule } from "../middlewares/movieValidation.ts";

const router = Router();

router.get("/", getAuditoriums);
router.get("/:id", idRule, handleValidation, getAuditoriumById);
router.post("/", auditoriumBodyRules, handleValidation, createAuditorium);
router.put(
  "/:id",
  idRule,
  auditoriumBodyRules,
  handleValidation,
  updateAuditorium,
);
router.delete("/:id", idRule, handleValidation, deleteAuditorium);

export default router;