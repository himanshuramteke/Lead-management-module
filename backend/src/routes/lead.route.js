import express from "express";
import { getAllLeads, getLead } from "../controllers/lead.controller.js";

const router = express.Router();

router.get("/", getAllLeads);

router.get("/:id", getLead);

export default router;
