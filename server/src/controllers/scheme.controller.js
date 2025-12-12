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
        console.log("Sending Eligibility response...");
        return res.status(200).json({ message: "Eligibility data received" });
    } catch (error) {
        console.error("Error logging eligibility data:", error);
        return res.status(500).json({ message: "Internal server error" });
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
        console.log("Sending Documents response...");
        return res.status(200).json({ message: "Documents data received" });
    } catch (error) {
        console.error("Error logging documents data:", error);
        return res.status(500).json({ message: "Internal server error" });
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
        console.log("Sending Timeline response...");
        return res.status(200).json({ message: "Timeline data received" });
    } catch (error) {
        console.error("Error logging timeline data:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

/**
 * Triggers the Kestra scheme eligibility flow.
 * Expected Body: User details object
 * Example Input:
 * {
 *   "gender": "Male",
 *   "age": 30,
 *   "marital_status": "Single",
 *   "state": "Karnataka",
 *   "area": "Urban",
 *   "category": "General",
 *   "person_with_disability": "No",
 *   "minority": "No",
 *   "student": "No",
 *   "below_poverty_line": "No"
 * }
 */
export const triggerSchemeFlow = async (req, res) => {
    try {
        const userDetails = req.body;
        console.log("Triggering Kestra flow with details:", userDetails);

        const response = await fetch("http://localhost:8080/api/v1/main/executions/webhook/dev/scheme_eligibility_flow/agent-assemble-secret-key", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ user_details: JSON.stringify(userDetails) })
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
