import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router'
import useForm from '../../hooks/useForm'
import { login } from '../../services/authService'
import useRequest from '../../hooks/useRequest'
import { AuthContext } from '../../Context/AuthContext'
import './LoginScreen.css'

const LoginScreen = () => {

    const {
        sendRequest, 
        error, 
        response, 
        loading
    } = useRequest()

    const LOGIN_FORM_FIELDS = {
        EMAIL: 'email',
        PASSWORD: 'password'
    }

    const initialFormState = {
        [LOGIN_FORM_FIELDS.EMAIL]: '',
        [LOGIN_FORM_FIELDS.PASSWORD]: ''
    }

    const {manageLogin} = useContext(AuthContext)

    const [formError, setFormError] = useState(null)

    function onLogin (formState){
        const email = formState[LOGIN_FORM_FIELDS.EMAIL]
        const password = formState[LOGIN_FORM_FIELDS.PASSWORD]

        if(!email || !password){
            setFormError('Todos los campos son obligatorios')
            return
        }

        setFormError(null)
        sendRequest({
            requestCb: async () => {
                return await login({
                    email,
                    password
                })
            }
        })
    }

    const {
        handleChangeInput, //Funcion de cambio del input, debemos asociarlas a cada input
        onSubmit, //Funcion que asociaremos al evento submit del formario
        formState
    } = useForm({ //Usamos useForm cada vez que tengamos que capurar campos de un formulario (Manejo de formularios)
        initialFormState,  //Estado incial del formulario
        submitFn: onLogin //Funcion que se activa al enviar formulario
    })

    console.log(
        {
            response,
            error,
            loading
        }
    )

    /* 
    La funcion se carga cada vez que cambie response
    */
    useEffect(
        () => {
            //Si la respuesta es correcta
            if(response){
                if(response.ok){
                    //Guardo el token en mi contexto
                    manageLogin(response.data.auth_token)
                } else {
                    setFormError(response.message)
                }
            }
        },
        [response]
    )

   
    console.log(formState)

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1 className="auth-title">
                    Iniciar sesion
                </h1>
                <form onSubmit={onSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input 
                            type="email" 
                            id="email"  
                            name={LOGIN_FORM_FIELDS.EMAIL} 
                            onChange={handleChangeInput}
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name={LOGIN_FORM_FIELDS.PASSWORD} 
                            onChange={handleChangeInput}
                            className="form-input"
                        />
                    </div>
                    {formError && <span className="form-error-message">{formError}</span>}
                    <button type="submit" className="auth-button">
                        {loading ? 'Cargando...' : 'Iniciar sesion'}
                    </button>
                </form>
                <div className="auth-links">
                    <div className="auth-link-item">No tienes una cuenta? <Link to="/register">Registrarse</Link></div>
                    <div className="auth-link-item">Olvidaste tu contraseña? <Link to="/reset-password-request">Restablecer</Link></div>
                </div>
            </div>
        </div>
    )
}

export default LoginScreen