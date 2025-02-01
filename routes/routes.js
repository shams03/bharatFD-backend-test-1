import { Router } from "express";
import {
  getFAQ,
  createFAQ,
  getById,
  deleteFAQ,
  updateFAQ,
} from "../controller/faqController.js";

export const router = Router();

router.get("/api/faqs/", getFAQ);
router.post("/api/faqs/", createFAQ);
router.get("/api/faqs/:id", getById);
router.delete("/api/faqs/:id", deleteFAQ);
router.put("/api/faqs/:id", updateFAQ);
