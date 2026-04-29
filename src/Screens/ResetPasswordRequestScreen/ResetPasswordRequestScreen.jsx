import React, { useEffect } from 'react'
import { Link } from 'react-router'
import useForm from '../../hooks/useForm'
import useRequest from '../../hooks/useRequest'
import { resetPasswordRequest } from '../../services/authService'
import './ResetPasswordRequestScreen.css'

const ResetPasswordRequestScreen = () => {

  const {
    sendRequest,
    response,
    error,
    loading
  } = useRequest()

  const FORM_FIELDS = {
    EMAIL: 'email'
  }
  const initalFormState = {
    [FORM_FIELDS.EMAIL]: ''
  }

  function submitResetPasswordRequest() {
    sendRequest(
      {
        requestCb: async () => {
          return await resetPasswordRequest({ email: formState[FORM_FIELDS.EMAIL] })
        }
      }
    )
  }

  const {
    handleChangeInput,
    onSubmit,
    formState,
    resetForm
  } = useForm({
    initialFormState: initalFormState,
    submitFn: submitResetPasswordRequest
  })


  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Restablecer contraseña</h1>

        {
          response && !loading && !error ?
            <div className="auth-success-message">{response.message}</div>
            :
            <>
              <p className="auth-description">
                Se enviara un mail con instrucciones para que puedas restablecer tu contraseña
              </p>
              <form onSubmit={onSubmit} className="auth-form">
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email:</label>
                  <input
                    type="email"
                    name={FORM_FIELDS.EMAIL}
                    id="email"
                    onChange={handleChangeInput}
                    value={formState[FORM_FIELDS.EMAIL]}
                    className="form-input"
                  />
                </div>
                <button type='submit' disabled={loading} className="auth-button">
                  {loading ? 'Cargando' : 'Enviar solicitud'}
                </button>
              </form>
              <div className="auth-links">
                <div className="auth-link-item">
                  Recuerdas tu contraseña? <Link to={'/login'}>Inciar sesion</Link>
                </div>
                <div className="auth-link-item">
                  No tienes una cuenta? <Link to="/register">Registrarse</Link>
                </div>
              </div>
            </>
        }
      </div>
    </div>
  )
}


export default ResetPasswordRequestScreen