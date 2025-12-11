import express from "express";
import { logEligibility, logDocuments, logTimeline } from "../controllers/scheme.controller.js";

const router = express.Router();

router.post("/eligibility", logEligibility);
router.post("/documents", logDocuments);
router.post("/timeline", logTimeline);

export default router;
