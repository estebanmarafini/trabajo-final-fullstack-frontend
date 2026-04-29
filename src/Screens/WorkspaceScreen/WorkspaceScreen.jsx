import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate, Link } from 'react-router'
import useWorkspace from '../../hooks/useWorkspace'
import useChannel from '../../hooks/useChannel'
import { AuthContext } from '../../Context/AuthContext'
import './WorkspaceScreen.css'

const WorkspaceScreen = () => {
    const { workspace_id } = useParams()
    const navigate = useNavigate()
    const { workspace, loading: workspaceLoading, error: workspaceError } = useWorkspace(workspace_id)
    const { getAllChannels, channels, channelsLoading, createNewChannel, createChannelLoading, removeChannel } = useChannel()
    const [newChannelName, setNewChannelName] = useState('')
    const { isLogged, manageLogout } = useContext(AuthContext)

    useEffect(() => {
        if (workspace_id) {
            getAllChannels(workspace_id)
        }
    }, [workspace_id])

    const handleCreateChannel = async (e) => {
        e.preventDefault()
        if (newChannelName.trim()) {
            await createNewChannel(workspace_id, newChannelName)
            setNewChannelName('')
            getAllChannels(workspace_id) // Refresh list
        }
    }


    return (
        <div className="workspace-container">
            {workspaceLoading && <p>Cargando detalles del espacio de trabajo...</p>}
            {workspaceError && <p className="error-message">Error: {workspaceError}</p>}

            {workspace && (
                <>
                    <header className="workspace-header">
                        <h1 className="workspace-title">{workspace.title}</h1>
                        <div className="header-actions">
                            {isLogged && <button onClick={manageLogout} className="auth-button">Cerrar sesion</button>}
                        </div>
                    </header>
                    <div className="workspace-content">
                        <h2>Canales</h2>
                        {channelsLoading ? (
                            <p>Cargando canales...</p>
                        ) : (
                            <ul className="channel-list">
                                {channels.map(channel => (
                                    <li
                                        key={channel._id}
                                        className="channel-item-container"
                                    >
                                        <Link
                                            to={`/workspace/${workspace_id}/${channel._id}`}
                                            className="channel-item"
                                            style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                                        >
                                            ▶ {channel.name}
                                        </Link>
                                        <button
                                            onClick={async (e) => {
                                                e.stopPropagation();
                                                const confirmDelete = window.confirm("¿Estás seguro de eliminar este canal?");
                                                if (confirmDelete) {
                                                    try {
                                                        await removeChannel(workspace_id, channel._id);
                                                        getAllChannels(workspace_id);
                                                    } catch (err) {
                                                        alert("Necesitas ser Creador o administrador para realizar esta operación");
                                                    }
                                                }
                                            }}
                                            className="channel-delete-btn"
                                        >
                                            Eliminar
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}

                        <form onSubmit={handleCreateChannel} className="create-channel-form">
                            <input
                                type="text"
                                placeholder="Nuevo canal"
                                value={newChannelName}
                                onChange={(e) => setNewChannelName(e.target.value)}
                                disabled={createChannelLoading}
                                className="create-channel-input"
                            />
                            <button type="submit" disabled={createChannelLoading} className="create-channel-button">
                                {createChannelLoading ? 'Creando...' : 'Crear Canal'}
                            </button>
                        </form>
                    </div>
                </>
            )}

            <button className="back-button" onClick={() => navigate('/home')}>Volver atras</button>
        </div>
    )
}

export default WorkspaceScreen
