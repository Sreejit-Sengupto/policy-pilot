import express from "express";
import { logEligibility, logDocuments, logTimeline, triggerSchemeFlow, getSchemeDetails } from "../controllers/scheme.controller.js";

const router = express.Router();

router.post("/eligibility", logEligibility);
router.post("/documents", logDocuments);
router.post("/timeline", logTimeline);
router.post("/trigger", triggerSchemeFlow);
router.get("/user/:clerkUserId", getSchemeDetails);

export default router;
