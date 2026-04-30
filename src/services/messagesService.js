import ENVIRONMENT from "../config/environment";
import { LOCALSTORAGE_TOKEN_KEY } from "../Context/AuthContext";

export async function getMessages(workspace_id, channel_id) {
    const token = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
    const response_http = await fetch(
        `${ENVIRONMENT.API_URL}/api/workspace/${workspace_id}/channels/${channel_id}/messages`,
        {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }
    )

    if (!response_http.ok) {
        let errorData = {};
        try {
            errorData = await response_http.json();
        } catch (error) {
            errorData.message = `Error HTTP ${response_http.status}`;
        }
        throw new Error(errorData.message || "Failed to fetch messages");
    }

    return response_http.json();
}

export async function createMessage({ workspace_id, channel_id, content }) {
    const token = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
    const response_http = await fetch(
        `${ENVIRONMENT.API_URL}/api/workspace/${workspace_id}/channels/${channel_id}/messages`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ content }),
        }
    );

    if (!response_http.ok) {
        const errorData = await response_http.json();
        throw new Error(errorData.message || "Failed to send message");
    }

    return response_http.json();
}
