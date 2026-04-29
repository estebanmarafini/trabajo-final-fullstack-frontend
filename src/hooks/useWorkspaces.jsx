import { useEffect } from "react"
import useRequest from "./useRequest"
import { getWorkspaces, updateWorkspaceRequest, deleteWorkspaceRequest } from "../services/workspaceService"

function useWorkspaces() {
    /* 
 Manejar la respuesta del servidor con useRequest o hook de preferencia
 Representar los estados en la pantalla, en especial el cargando y la lista de espacios de trabajo
 Cada espacio de trabajo debera mostrar el titulo y un link que diga 'abrir workspace' y lleve hacia '/workspace/:id_workspace

 Recomendacion:
   Usen un efecto que se ejecute solo una vez para cargar la lista de espacios de trabjo
 */

    const { sendRequest, response, loading, error } = useRequest()

    const fetchWorkspaces = () => {
        sendRequest({ requestCb: getWorkspaces })
    }

    useEffect(
        () => {
            fetchWorkspaces()
        },
        []
    )
   
    const updateWorkspace = async (workspace_id, title, description) => {
        await updateWorkspaceRequest(workspace_id, title, description)
        fetchWorkspaces()
    }

    const deleteWorkspace = async (workspace_id) => {
        await deleteWorkspaceRequest(workspace_id)
        fetchWorkspaces()
    }

    return {
        response, 
        loading, 
        error,
        workspaces: response?.data?.workspaces,
        updateWorkspace,
        deleteWorkspace
    }
}

export default useWorkspaces