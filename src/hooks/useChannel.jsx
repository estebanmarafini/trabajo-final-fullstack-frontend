import useRequest from "./useRequest";
import { getChannels, createChannel, deleteChannelRequest } from "../services/channelService";

const useChannel = () => {
    const { sendRequest, response, error, loading } = useRequest();
    const { sendRequest: sendCreateRequest, response: createResponse, error: createError, loading: createLoading } = useRequest();

    const getAllChannels = async (workspace_id) => {
        await sendRequest({
            requestCb: getChannels,
            params: workspace_id
        });
    };

    const createNewChannel = async (workspace_id, name) => {
        await sendCreateRequest({
            requestCb: async (params) => await createChannel(params.workspace_id, params.name),
            params: { workspace_id, name }
        });
    };

    const removeChannel = async (workspace_id, channel_id) => {
        await deleteChannelRequest(workspace_id, channel_id);
    };

    return {
        getAllChannels,
        channels: response?.data?.channels || [],
        channelsLoading: loading,
        channelsError: error,
        createNewChannel,
        createChannelResponse: createResponse,
        createChannelLoading: createLoading,
        createChannelError: createError,
        removeChannel
    };
};

export default useChannel;
