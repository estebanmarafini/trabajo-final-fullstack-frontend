import React, { useContext, useState } from 'react'
import { Link } from 'react-router'
import useWorkspaces from '../../hooks/useWorkspaces'
import { AuthContext } from '../../Context/AuthContext'
import './HomeScreen.css'

const HomeScreen = () => {

  const {response, loading, error, workspaces, deleteWorkspace, updateWorkspace} = useWorkspaces()
  const {isLogged, manageLogout} = useContext(AuthContext)
 
  const [editingWorkspaceId, setEditingWorkspaceId] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')

  const handleEditClick = (workspace) => {
    setEditingWorkspaceId(workspace.workspace_id)
    setEditTitle(workspace.workspace_title)
    setEditDescription(workspace.workspace_description || '')
  }

  const handleCancelEdit = () => {
    setEditingWorkspaceId(null)
    setEditTitle('')
    setEditDescription('')
  }

  const handleUpdate = async (workspace_id) => {
    try {
      await updateWorkspace(workspace_id, editTitle, editDescription)
      setEditingWorkspaceId(null)
    } catch (err) {
      alert("Necesitas ser Creador o administrador para realizar esta operación")
    }
  }

  const handleDelete = async (workspace_id) => {
    const confirmDelete = window.confirm("¿Estás seguro de eliminar este espacio de trabajo?")
    if (confirmDelete) {
      try {
        await deleteWorkspace(workspace_id)
      } catch (err) {
        alert("Necesitas ser Creador o administrador para realizar esta operación")
      }
    }
  }

  return (
    <div className="home-container">
      <header className="home-header">
        <Link to={'/workspace/new'} className="home-nav-link">Crear espacio de trabajo</Link>
        {
          isLogged 
          ? <button onClick={manageLogout} className="auth-button">Cerrar sesion</button>
          : <button className="auth-button">Login</button>
        }
      </header>

      <main className="home-main">
        <h1 className="home-title">Bienvenido, seleccione su espacio de trabajo</h1>
        {
          loading && <div className="loading-state">Cargando</div>
        }
        {
          !loading && workspaces && <div>
            {
            workspaces.length === 0
            ? <div className="empty-state">No hay espacios de trabajo</div>
            : <div className="workspace-grid">
                {workspaces.map(
                  (workspace) => {
                    return (
                      <div key={workspace.workspace_id} className="workspace-card">
                        {editingWorkspaceId === workspace.workspace_id ? (
                          <div className="workspace-edit-form">
                            <input 
                              type="text" 
                              value={editTitle} 
                              onChange={(e) => setEditTitle(e.target.value)} 
                              className="form-input"
                              placeholder="Título"
                            />
                            <input 
                              type="text" 
                              value={editDescription} 
                              onChange={(e) => setEditDescription(e.target.value)} 
                              className="form-input"
                              placeholder="Descripción"
                            />
                            <div className="workspace-card-actions">
                              <button onClick={() => handleUpdate(workspace.workspace_id)} className="workspace-action-btn primary">Guardar</button>
                              <button onClick={handleCancelEdit} className="workspace-action-btn">Cancelar</button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <h2 className="workspace-card-title">{workspace.workspace_title}</h2>
                            <Link to={'/workspace/' + workspace.workspace_id} className="workspace-card-link">Abrir espacio de trabajo</Link>
                            <div className="workspace-card-actions">
                              <button onClick={() => handleEditClick(workspace)} className="workspace-action-btn">Editar</button>
                              <button onClick={() => handleDelete(workspace.workspace_id)} className="workspace-action-btn danger">Eliminar</button>
                            </div>
                          </>
                        )}
                      </div>
                    )
                  }
                )}
              </div>
            }
          </div>
        }
      </main>
    </div>
  )
}

export default HomeScreen