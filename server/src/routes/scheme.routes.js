import express from "express";
import { logEligibility, logDocuments, logTimeline, triggerSchemeFlow } from "../controllers/scheme.controller.js";

const router = express.Router();

router.post("/eligibility", logEligibility);
router.post("/documents", logDocuments);
router.post("/timeline", logTimeline);
router.post("/trigger", triggerSchemeFlow);

export default router;
