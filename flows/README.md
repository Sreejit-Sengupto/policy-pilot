# Scheme Eligibility Flow & Server Setup

This directory contains the Kestra flow `scheme_eligibility_flow.yaml` which orchestrates AI agents to find government schemes, required documents, and generate an application timeline. It sends the structured output to a local Express server.

## Prerequisites

-   **Node.js** (v18+ recommended)
-   **Kestra** (running via Docker)
-   **Google Gemini API Key**
-   **Tavily API Key**

## 1. Setting up the Express Server

The server receives and logs the data from the Kestra flow.

1.  Navigate to the server directory:
    ```bash
    cd ../server
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Create a `.env` file in the `server` directory (if not exists) and add your port (optional, defaults to 8000):
    ```env
    PORT=8000
    MONGODB_URI=your_mongodb_uri # If needed for other parts of the app
    ```

4.  Start the server:
    ```bash
    npm run dev
    ```
    The server should be running on `http://localhost:8000`.

## 2. Setting up Kestra

1.  Ensure Kestra is running (usually via Docker Compose).

2.  **Add Secrets/KV Pairs**:
    You need to add the following KV pairs or Secrets in your Kestra instance:
    -   `GEMINI_API_KEY`: Your Google Gemini API key.
    -   `TAVILY_API_KEY`: Your Tavily Search API key.

3.  **Import the Flow**:
    -   Open the Kestra UI (usually `http://localhost:8080`).
    -   Go to **Flows** -> **Create**.
    -   Copy the content of `scheme_eligibility_flow.yaml` and paste it into the editor.
    -   Save the flow.

## 3. Running the Flow

1.  Click **Execute** on the flow page in Kestra UI.
2.  Provide the `user_details` input (JSON string) or use the default.
3.  The flow will execute the following steps:
    -   **eligibility_agent**: Finds schemes based on user details.
    -   **send_eligibility**: Sends scheme data to the server.
    -   **document_agent**: Finds documents for the schemes.
    -   **send_documents**: Sends document data to the server.
    -   **timeline_agent**: Creates a timeline.
    -   **send_timeline**: Sends timeline data to the server.

## Troubleshooting

### Connection Refused (Kestra to Server)

If Kestra is running in Docker and cannot reach your local Express server:

-   The flow uses `http://host.docker.internal:8000` to reach the host machine from the container.
-   **Linux Users**: If `host.docker.internal` does not work, try using the Docker bridge IP, typically `172.17.0.1`.
    -   Update the `uri` in `scheme_eligibility_flow.yaml`:
        ```yaml
        uri: http://172.17.0.1:8000/api/v1/scheme/eligibility
        ```

### JSON Parsing Errors

The server is equipped to handle Kestra's output format (which might be a JSON string inside an array). If you see parsing errors in the server logs, ensure the `parseKestraOutput` helper in `scheme.controller.js` is working as expected.
