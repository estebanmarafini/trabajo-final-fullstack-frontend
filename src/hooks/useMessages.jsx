import useRequest from "./useRequest";
import { getMessages, createMessage } from "../services/messagesService";

const useMessages = () => {
    const { sendRequest, response, error, loading } = useRequest();
    const { sendRequest: sendCreateRequest, response: createResponse, error: createError, loading: createLoading } = useRequest();

    const getAllMessages = async (workspace_id, channel_id) => {
        await sendRequest({
            requestCb: async (params) => await getMessages(params.workspace_id, params.channel_id),
            params: { workspace_id, channel_id }
        });
    };

    const sendMessage = async (workspace_id, channel_id, content) => {
        await sendCreateRequest({
            requestCb: createMessage,
            params: { workspace_id, channel_id, content }
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
