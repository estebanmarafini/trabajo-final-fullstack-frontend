import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router'
import useWorkspace from '../../hooks/useWorkspace'
import useMessages from '../../hooks/useMessages'
import { AuthContext } from '../../Context/AuthContext'
import './ChannelScreen.css'

const ChannelScreen = () => {
    const { workspace_id, channel_id } = useParams()
    const navigate = useNavigate()
    const { workspace, members, loading: workspaceLoading } = useWorkspace(workspace_id)
    const { getAllMessages, messages, messagesLoading, sendMessage, sendMessageLoading } = useMessages()
    const [newMessage, setNewMessage] = useState('')
    const { isLogged, manageLogout } = useContext(AuthContext)

    useEffect(() => {
        if (workspace_id && channel_id) {
            getAllMessages(workspace_id, channel_id)
        }
    }, [workspace_id, channel_id])

    const handleSendMessage = async (e) => {
        e.preventDefault()
        if (newMessage.trim()) {
            await sendMessage(workspace_id, channel_id, newMessage)
            setNewMessage('')
            getAllMessages(workspace_id, channel_id) // Refresh messages
        }
    }

    return (
        <div className="channel-container">
            <header className="channel-header">
                <h1 className="channel-title">{workspace?.title} - Canal</h1>
                <div className="header-actions">
                    {isLogged && <button onClick={manageLogout} className="auth-button">Cerrar sesion</button>}
                </div>
            </header>
            
            <div className="channel-body">
                {/* Left Side: Members */}
                <aside className="channel-sidebar">
                    <h3 className="sidebar-header">Miembros</h3>
                    {workspaceLoading ? (
                        <p className="loading-state">Cargando miembros...</p>
                    ) : (
                        <ul className="member-list">
                            {members?.map(member => (
                                <li key={member.member_id} className="member-item">
                                    {member.user_name}
                                </li>
                            ))}
                        </ul>
                    )}
                    
                    <button className="back-button sidebar-back-button" onClick={() => navigate(`/workspace/${workspace_id}`)}>Volver atras</button>
                </aside>

                {/* Right Side: Chat */}
                <main className="chat-area">
                    <div className="message-list-container">
                        {messagesLoading ? (
                            <p className="loading-state">Cargando mensajes...</p>
                        ) : messages.length > 0 ? (
                            <>
                                {messages.map(msg => (
                                    <div key={msg._id} className="message-item">
                                        <div className="message-header">
                                            <span className="message-username">{msg.fk_id_member?.fk_id_user?.name || 'Usuario'}</span>
                                            <span className="message-timestamp">
                                                {new Date(msg.created_at).toLocaleString()}
                                            </span>
                                        </div>
                                        <p className="message-content">{msg.content}</p>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <p className="empty-state">Aun no hay mensajes</p>
                        )}
                    </div>

                    <div className="chat-input-container">
                        <form onSubmit={handleSendMessage} className="chat-form">
                            <input 
                                type="text" 
                                placeholder="Escribe un mensaje..." 
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                className="chat-input"
                                disabled={sendMessageLoading}
                            />
                            <button type="submit" disabled={sendMessageLoading} className="chat-submit-button">
                                {sendMessageLoading ? 'Enviando...' : 'Enviar'}
                            </button>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default ChannelScreen
