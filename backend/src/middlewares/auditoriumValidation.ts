import { body } from "express-validator";

export const auditoriumBodyRules = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("capacity")
    .isInt({ min: 1 })
    .withMessage("Capacity must be greater than 0"),
];