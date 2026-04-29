import { useEffect } from "react";
import useForm from "../../hooks/useForm";
import useRequest from "../../hooks/useRequest";
import { useNavigate } from "react-router";
import { createWorkspace } from "../../services/workspaceService";
import './NewWorkspaceScreen.css';

export default function NewWorkspaceScreen() {
    const navigate = useNavigate();
    const { sendRequest, error, loading, response } = useRequest();
    const CREATE_WORKSPACE_FORM_FIELD = {
        TITLE: "title",
        DESCRIPTION: "description",
        URL_IMAGE: "url_image",
    };

    const initialFormState = {
        [CREATE_WORKSPACE_FORM_FIELD.TITLE]: "",
        [CREATE_WORKSPACE_FORM_FIELD.DESCRIPTION]: "",
        [CREATE_WORKSPACE_FORM_FIELD.URL_IMAGE]: "",
    };

    const onWorkspaceCreate = (formData) => {
        sendRequest({
            requestCb: async () => {
                return await createWorkspace({
                    title: formData[CREATE_WORKSPACE_FORM_FIELD.TITLE],
                    description: formData[CREATE_WORKSPACE_FORM_FIELD.DESCRIPTION],
                    url_image: formData[CREATE_WORKSPACE_FORM_FIELD.URL_IMAGE],
                });
            },
        });
    };

    const { handleChangeInput, onSubmit } = useForm({
        initialFormState,
        submitFn: onWorkspaceCreate,
    });

    useEffect(() => {
        if (response?.ok) {
            navigate("/home");
        }
    }, [response, navigate]);

    return (
        <div className="workspace-create-container">
            <div className="workspace-create-card">
                <h1 className="workspace-create-title">
                    Nuevo Workspace
                </h1>

                <form onSubmit={onSubmit} className="workspace-create-form">
                    <div className="form-group">
                        <label htmlFor="title" className="form-label">
                            Titulo
                        </label>
                        <input
                            type="text"
                            id="title"
                            name={CREATE_WORKSPACE_FORM_FIELD.TITLE}
                            onChange={handleChangeInput}
                            className="form-input"
                            placeholder="Titulo del workspace"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description" className="form-label">
                            Descripción
                        </label>
                        <input
                            type="text"
                            id="description"
                            name={CREATE_WORKSPACE_FORM_FIELD.DESCRIPTION}
                            onChange={handleChangeInput}
                            className="form-input"
                            placeholder="Descripción del workspace"
                        />
                    </div>

                    <button type="submit" disabled={loading} className="workspace-create-button">
                        {loading ? "Creando Workspace..." : "Crear Workspace"}
                    </button>

                    {error && (
                        <span className="error-message">
                            {error}
                        </span>
                    )}

                    {response && (
                        <span className="success-message">
                            {response.message}
                        </span>
                    )}
                </form>
            </div>
        </div>
    );
}
