import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import useForm from '../../hooks/useForm'
import useRequest from '../../hooks/useRequest'
import { register } from '../../services/authService'
import './RegisterScreen.css'

const RegisterScreen = () => {

    const {
        sendRequest,
        response,
        error,
        loading
    } = useRequest()

    const REGISTER_FORM_FIELDS = {
        EMAIL: 'email',
        PASSWORD: 'password',
        NAME: 'name'
    }

    const initialFormState = {
        [REGISTER_FORM_FIELDS.NAME]: '',
        [REGISTER_FORM_FIELDS.EMAIL]: '',
        [REGISTER_FORM_FIELDS.PASSWORD]: ''
    }
    const [formError, setFormError] = useState(null)

    function onRegister(formState) {
        const email = formState[REGISTER_FORM_FIELDS.EMAIL]
        const password = formState[REGISTER_FORM_FIELDS.PASSWORD]
        const name = formState[REGISTER_FORM_FIELDS.NAME]

        if(!email || !password || !name){
            setFormError('Todos los campos son obligatorios')
            return
        }

        setFormError(null)
        try {
            sendRequest(
                {
                    requestCb: () => {
                        return register(
                            {
                                email,
                                password,
                                name
                            }
                        )
                    }
                }
            )
        }
        catch (error) {
            console.log(error)
        }

    }
    const { handleChangeInput, onSubmit, formState } = useForm({ initialFormState, submitFn: onRegister })
    const navigate = useNavigate()
    useEffect (
        () => {
            if(response){
                if(response.ok){
                    alert('Te has registrado exitosamente, te enviamos un mail con instrucciones')
                    navigate('/login')
                } else {
                    setFormError(response.message)
                }
            }
        },
        [response]
    )

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1 className="auth-title">
                    Registrarse
                </h1>
                <form onSubmit={onSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" id="name" name={REGISTER_FORM_FIELDS.NAME} onChange={handleChangeInput} value={formState[REGISTER_FORM_FIELDS.NAME]} className="form-input" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" id="email" name={REGISTER_FORM_FIELDS.EMAIL} onChange={handleChangeInput} value={formState[REGISTER_FORM_FIELDS.EMAIL]} className="form-input" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" id="password" name={REGISTER_FORM_FIELDS.PASSWORD} onChange={handleChangeInput} value={formState[REGISTER_FORM_FIELDS.PASSWORD]} className="form-input" />
                    </div>
                    {formError && <span className="form-error-message">{formError}</span>}
                    <button type="submit" className="auth-button">
                        {loading ? 'Cargando...' : 'Registrarse'}
                    </button>
                </form>
                <div className="auth-links">
                    <div className="auth-link-item">Ya tienes una cuenta? <Link to="/login">Iniciar sesion</Link></div>
                </div>
            </div>
        </div>
    )
}


export default RegisterScreen