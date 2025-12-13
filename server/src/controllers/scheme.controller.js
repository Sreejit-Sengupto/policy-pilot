import { Eligibility } from "../models/eligibility.model.js";
import { Document } from "../models/document.model.js";
import { Timeline } from "../models/timeline.model.js";

const parseKestraOutput = (data) => {
    if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'string') {
        try {
            return JSON.parse(data[0]);
        } catch (e) {
            console.error("Failed to parse inner JSON string:", e);
        }
    }
    return data;
};

/**
 * Logs eligibility data.
 * Expected Body Structure:
 * {
 *   "clerkUserId": "string",
 *   "executionId": "string",
 *   "data": {
 *     "schemes": [ ... ]
 *   }
 * }
 */
export const logEligibility = async (req, res) => {
    try {
        console.log("Received Eligibility Data:");
        const { clerkUserId, executionId, data } = req.body;
        const eligibilityData = parseKestraOutput(data);
        console.log(JSON.stringify(eligibilityData, null, 2));

        const newEligibility = new Eligibility({
            clerkUserId,
            executionId,
            ...eligibilityData
        });
        await newEligibility.save();
        console.log("Eligibility data saved to DB");

        return res.status(200).json({ message: "Eligibility data received and saved" });
    } catch (error) {
        console.error("Error logging eligibility data:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

/**
 * Logs documents data.
 * Expected Body Structure:
 * {
 *   "clerkUserId": "string",
 *   "executionId": "string",
 *   "data": {
 *     "schemes": [ ... ]
 *   }
 * }
 */
export const logDocuments = async (req, res) => {
    try {
        console.log("Received Documents Data:");
        const { clerkUserId, executionId, data } = req.body;
        const documentsData = parseKestraOutput(data);
        console.log(JSON.stringify(documentsData, null, 2));

        const newDocument = new Document({
            clerkUserId,
            executionId,
            ...documentsData
        });
        await newDocument.save();
        console.log("Documents data saved to DB");

        return res.status(200).json({ message: "Documents data received and saved" });
    } catch (error) {
        console.error("Error logging documents data:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

/**
 * Logs timeline data.
 * Expected Body Structure:
 * {
 *   "clerkUserId": "string",
 *   "executionId": "string",
 *   "data": {
 *     "timeline_steps": [ ... ]
 *   }
 * }
 */
export const logTimeline = async (req, res) => {
    try {
        console.log("Received Timeline Data:");
        const { clerkUserId, executionId, data } = req.body;
        const timelineData = parseKestraOutput(data);
        console.log(JSON.stringify(timelineData, null, 2));

        const newTimeline = new Timeline({
            clerkUserId,
            executionId,
            ...timelineData
        });
        await newTimeline.save();
        console.log("Timeline data saved to DB");

        return res.status(200).json({ message: "Timeline data received and saved" });
    } catch (error) {
        console.error("Error logging timeline data:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

/**
 * Triggers the Kestra scheme eligibility flow.
 * Expected Body: 
 * {
 *   "clerkUserId": "string",
 *   "userDetails": { ... }
 * }
 */
export const triggerSchemeFlow = async (req, res) => {
    try {
        const { clerkUserId, userDetails } = req.body;
        console.log("Triggering Kestra flow with details:", userDetails, "for user:", clerkUserId);

        const response = await fetch("http://localhost:8080/api/v1/main/executions/webhook/dev/scheme_eligibility_flow/agent-assemble-secret-key", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_details: JSON.stringify(userDetails),
                clerkUserId: clerkUserId
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Kestra API error: ${response.status} ${errorText}`);
        }

        const data = await response.json();
        console.log("Kestra flow triggered:", data);
        return res.status(200).json({ message: "Flow triggered successfully", executionId: data.id });

    } catch (error) {
        console.error("Error triggering flow:", error);
        return res.status(500).json({ message: "Failed to trigger flow", error: error.message });
    }
};

/**
 * Fetches the user's eligibility, documents, and timeline data.
 * Merges eligibility and documents by scheme name.
 * Returns the latest data found for the given clerkUserId.
 */
export const getSchemeDetails = async (req, res) => {
    try {
        const { clerkUserId } = req.params;
        const { scheme_name } = req.query;

        console.log(`Fetching scheme details for user: ${clerkUserId}`);

        let eligibilityEntry;

        if (scheme_name) {
            // Find the latest eligibility entry that contains the requested scheme
            eligibilityEntry = await Eligibility.findOne({
                clerkUserId,
                "schemes.scheme_name": { $regex: scheme_name, $options: 'i' }
            }).sort({ createdAt: -1 });
        } else {
            // Find the latest eligibility entry
            eligibilityEntry = await Eligibility.findOne({ clerkUserId }).sort({ createdAt: -1 });
        }

        if (!eligibilityEntry) {
            return res.status(404).json({ message: "No eligibility data found for this user" });
        }

        const executionId = eligibilityEntry.executionId;
        console.log(`Found eligibility entry with executionId: ${executionId}`);

        // Fetch corresponding documents and timeline using executionId
        const documentEntry = await Document.findOne({ executionId });
        const timelineEntry = await Timeline.findOne({ executionId });

        // Merge schemes from Eligibility and Document models
        let schemes = eligibilityEntry.schemes.map(scheme => {
            const docScheme = documentEntry ? documentEntry.schemes.find(s => s.scheme_name === scheme.scheme_name) : null;
            return {
                ...scheme.toObject(),
                documents: docScheme ? docScheme.documents : []
            };
        });

        // Filter by scheme_name if provided
        if (scheme_name) {
            schemes = schemes.filter(s => s.scheme_name.toLowerCase().includes(scheme_name.toLowerCase()));
        }

        return res.status(200).json({
            clerkUserId,
            executionId,
            schemes,
            timeline: timelineEntry ? timelineEntry.timeline_steps : []
        });

    } catch (error) {
        console.error("Error fetching scheme details:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
