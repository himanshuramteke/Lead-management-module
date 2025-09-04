import express from "express";
import {
  getAllLeads,
  getLead,
  createLead,
  updateLead,
  deleteLead,
} from "../controllers/lead.controller.js";

const router = express.Router();

router.get("/", getAllLeads);

router.get("/:id", getLead);

router.post("/", createLead);

router.put("/:id", updateLead);

router.delete("/:id", deleteLead);

export default router;
