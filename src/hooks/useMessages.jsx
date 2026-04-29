import useRequest from "./useRequest";
import { getMessages, createMessage } from "../services/messagesService";

const useMessages = () => {
    const { sendRequest, response, error, loading } = useRequest();
    const { sendRequest: sendCreateRequest, response: createResponse, error: createError, loading: createLoading } = useRequest();

    const getAllMessages = async (workspace_id, channel_id) => {
        await sendRequest({
            requestCb: () => getMessages(workspace_id, channel_id)
        });
    };

    const sendMessage = async (workspace_id, channel_id, content) => {
        await sendCreateRequest({
            requestCb: () => createMessage({ workspace_id, channel_id, content })
        });
    };

    return {
        getAllMessages,
        messages: response?.data?.messages || [],
        messagesLoading: loading,
        messagesError: error,
        sendMessage,
        sendMessageResponse: createResponse,
        sendMessageLoading: createLoading,
        sendMessageError: createError
    };
};

export default useMessages;
