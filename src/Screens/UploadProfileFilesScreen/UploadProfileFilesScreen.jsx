import React from 'react'
import useForm from '../../hooks/useForm'
import { uploadFile } from '../../services/fileService'
import './UploadProfileFilesScreen.css'

const UploadProfileFilesScreen = () => {
    const initial_form_state = {
        file: '',
        file_name: ''
    }
    async function submitFn(formState){
        console.log(formState.file)
        console.log(formState.file instanceof File)
        await uploadFile(formState.file_name, formState.file)
        resetForm()
    }
    const {handleChangeInput, onSubmit, resetForm, formState} = useForm({initialFormState:initial_form_state, submitFn: submitFn})

  return (
    <div className="upload-container">
        <div className="upload-card">
            <h1 className="upload-title">Carga tus archivos</h1>
            <form onSubmit={onSubmit} className="upload-form">
                <div className="form-group">
                    <label htmlFor='file_name' className="form-label">Nombre:</label>
                    <input 
                        type='text'
                        name='file_name'
                        id='file_name'
                        onChange={handleChangeInput}
                        value={formState.file_name}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="file" className="form-label">Adjunta tu archivo:</label>
                    <input 
                        name='file'
                        id='file'
                        type='file' 
                        accept='.jpg,.png,.webp,.jpeg'
                        onChange={handleChangeInput}
                        className="file-input"
                    />
                    {
                        formState.file && <img src={URL.createObjectURL(formState.file)} alt={formState.file_name} className="image-preview" />
                    }
                </div>
                <button type='submit' className="upload-button">Enviar</button>
            </form>
        </div>
    </div>
  )
}


export default UploadProfileFilesScreen