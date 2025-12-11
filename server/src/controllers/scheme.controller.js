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
 *   "schemes": [
 *     {
 *       "scheme_name": "string",
 *       "description": "string",
 *       "benefits": "string"
 *     }
 *   ]
 * }
 */
export const logEligibility = async (req, res) => {
    try {
        console.log("Received Eligibility Data:");
        const eligibilityData = parseKestraOutput(req.body);
        console.log(JSON.stringify(eligibilityData, null, 2));
        res.status(200).json({ message: "Eligibility data received" });
    } catch (error) {
        console.error("Error logging eligibility data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

/**
 * Logs documents data.
 * Expected Body Structure:
 * {
 *   "schemes": [
 *     {
 *       "scheme_name": "string",
 *       "documents": [
 *         {
 *           "document_name": "string",
 *           "procurement_method": "string"
 *         }
 *       ]
 *     }
 *   ]
 * }
 */
export const logDocuments = async (req, res) => {
    try {
        console.log("Received Documents Data:");
        const documentsData = parseKestraOutput(req.body);
        console.log(JSON.stringify(documentsData, null, 2));
        res.status(200).json({ message: "Documents data received" });
    } catch (error) {
        console.error("Error logging documents data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

/**
 * Logs timeline data.
 * Expected Body Structure:
 * {
 *   "timeline_steps": [
 *     {
 *       "step_order": integer,
 *       "action": "string",
 *       "description": "string",
 *       "estimated_duration": "string"
 *     }
 *   ]
 * }
 */
export const logTimeline = async (req, res) => {
    try {
        console.log("Received Timeline Data:");
        const timelineData = parseKestraOutput(req.body);
        console.log(JSON.stringify(timelineData, null, 2));
        res.status(200).json({ message: "Timeline data received" });
    } catch (error) {
        console.error("Error logging timeline data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
