import ENVIRONMENT from "../config/environment";
import { LOCALSTORAGE_TOKEN_KEY } from "../Context/AuthContext";

export async function getChannels(workspace_id) {
    const token = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
    const response_http = await fetch(
        `${ENVIRONMENT.API_URL}/api/workspace/${workspace_id}/channels`,
        {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }
    )

    if (!response_http.ok) {
        const errorData = await response_http.json();
        throw new Error(errorData.message || "Failed to fetch channels");
    }

    return response_http.json();
}

export async function createChannel(workspace_id, name) {
    const token = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
    const response_http = await fetch(
        `${ENVIRONMENT.API_URL}/api/workspace/${workspace_id}/channels`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ name }),
        }
    );

    if (!response_http.ok) {
        const errorData = await response_http.json();
        throw new Error(errorData.message || "Failed to create channel");
    }

    return response_http.json();
}

export async function deleteChannelRequest(workspace_id, channel_id) {
    const token = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
    const response_http = await fetch(
        `${ENVIRONMENT.API_URL}/api/workspace/${workspace_id}/channels/${channel_id}`,
        {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }
    );

    if (!response_http.ok) {
        const errorData = await response_http.json();
        throw new Error(errorData.message || "Failed to delete channel");
    }

    return response_http.json();
}
