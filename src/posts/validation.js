import { body } from "express-validator";

export const postValidation = [
  body("category").exists().withMessage("Category is a mandatory"),
  body("title").exists().withMessage("Title is a mandatory "),
  body("content").exists().withMessage("Content is a mandatory "),
];

