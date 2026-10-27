import { body, param, validationResult } from "express-validator";
import type { NextFunction, Request, Response } from "express";

export const idRule = param("id").isInt({ min: 1 }).withMessage("Invalid id");

export const movieBodyRules = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("duration")
    .isInt({ min: 1 })
    .withMessage("Duration must be a positive integer"),
  body("genre").trim().notEmpty().withMessage("Genre is required"),
  body("rating").trim().notEmpty().withMessage("Rating is required"),
  body("synopsis").trim().notEmpty().withMessage("Synopsis is required"),
  body("posterUrl").optional({ values: "null" }).isString(),
  body("isActive").optional().isBoolean(),
];

export function handleValidation(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
}