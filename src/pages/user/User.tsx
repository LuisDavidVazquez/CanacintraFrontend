import { useState } from 'react'
import Title from '../../utils/Title'
import './User.css'
import axios from 'axios'
import Swal from 'sweetalert2'

interface UserInfo {
  nombre: string
  email: string
  fechaCreacion: string
  sistemasHidroponicos: number
  plantasCosechadas: number
  categoriasCosechadas: {
    categoria: string
    cantidad: number
  }[]
}

const url = import.meta.env.VITE_URL_BACKEND

const User = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    nombre: 'Juan Pérez',
    email: 'juan@example.com',
    fechaCreacion: '2024-01-15',
    sistemasHidroponicos: 3,
    plantasCosechadas: 15,
    categoriasCosechadas: [
      { categoria: 'Lechuga', cantidad: 8 },
      { categoria: 'Albahaca', cantidad: 4 },
      { categoria: 'Cilantro', cantidad: 3 }
    ]
  })

  const [mostrarModalPassword, setMostrarModalPassword] = useState(false)
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false)
  const [formPassword, setFormPassword] = useState({
    actual: '',
    nueva: '',
    confirmar: ''
  })
  const [formPerfil, setFormPerfil] = useState({
    nombre: userInfo.nombre,
    email: userInfo.email
  })

  const [passwordError, setPasswordError] = useState({
    longitud: false,
    coincidencia: false
  })

  const validarPassword = (password: string, confirmar: string) => {
    setPasswordError({
      longitud: password.length > 0 && password.length < 8,
      coincidencia: password.length > 0 && confirmar.length > 0 && password !== confirmar
    })
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const newFormPassword = { ...formPassword, [name]: value }
    setFormPassword(newFormPassword)
    
    if (name === 'nueva' || name === 'confirmar') {
      validarPassword(
        name === 'nueva' ? value : formPassword.nueva,
        name === 'confirmar' ? value : formPassword.confirmar
      )
    }
  }

  const handleCambiarPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    const token = localStorage.getItem('token')

    if (!token) {
      Swal.fire({
        title: 'Error de autenticación',
        text: 'Por favor, inicia sesión nuevamente',
        icon: 'error'
      })
      // Aquí podrías redirigir al login
      return
    }

    try {
      const response = await axios.put(
        `${url}/user/change-password`,
        {
          password: formPassword.actual,
          new_password: formPassword.nueva,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )

      if (response.status === 200) {
        setMostrarModalPassword(false)
        setFormPassword({ actual: '', nueva: '', confirmar: '' })
        setPasswordError({ longitud: false, coincidencia: false })
        Swal.fire({
          title: 'Contraseña actualizada',
          icon: 'success'
        })
      }
    } catch (error: any) {
      console.error('Error detallado:', error.response || error)
      
      if (error.response?.status === 401) {
        Swal.fire({
          title: 'Error de autenticación',
          text: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente',
          icon: 'error'
        })
        // Aquí podrías redirigir al login
      } else {
        Swal.fire({
          title: 'Error al cambiar la contraseña',
          text: 'La contraseña actual es incorrecta o hubo un problema de conexión',
          icon: 'error'
        })
      }
    }
  }

  const handleEditarPerfil = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para actualizar el perfil
    setUserInfo(prev => ({
      ...prev,
      nombre: formPerfil.nombre,
      email: formPerfil.email
    }))
    setMostrarModalEditar(false)
  }

  return (
    <div className="user-profile">
        <Title subtitle="Perfil"/>
      <div className="profile-header">
        <div className="profile-avatar">
          <span className="avatar-text">{userInfo.nombre[0]}</span>
        </div>
        <h1>Mi Perfil</h1>
      </div>

      <div className="profile-content">
        <div className="info-section">
          <h2>Información Personal</h2>
          <div className="info-grid">
            <div className="info-item">
              <label>Nombre</label>
              <p>{userInfo.nombre}</p>
            </div>
            <div className="info-item">
              <label>Email</label>
              <p>{userInfo.email}</p>
            </div>
            <div className="info-item">
              <label>Fecha de Registro</label>
              <p>{new Date(userInfo.fechaCreacion).toLocaleDateString('es-MX')}</p>
            </div>
          </div>
        </div>
        <div className="actions-section">
          <h2>Acciones de Cuenta</h2>
          <div className="actions-grid">
            <button 
              className="action-button primary"
              onClick={() => setMostrarModalPassword(true)}
            >
              Cambiar Contraseña
            </button>
            <button 
              className="action-button secondary"
              onClick={() => setMostrarModalEditar(true)}
            >
              Editar Perfil
            </button>
          </div>
        </div>
      </div>

      {/* Modal Cambiar Contraseña */}
      {mostrarModalPassword && (
        <div className="modal-overlay" onClick={() => setMostrarModalPassword(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button 
              className="cerrar-modal"
              onClick={() => setMostrarModalPassword(false)}
            >
              ×
            </button>
            <h2>Cambiar Contraseña</h2>
            <form onSubmit={handleCambiarPassword}>
              <div className="form-group">
                <label>Contraseña Actual</label>
                <input
                  type="password"
                  name="actual"
                  value={formPassword.actual}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Nueva Contraseña</label>
                <input
                  type="password"
                  name="nueva"
                  value={formPassword.nueva}
                  onChange={handlePasswordChange}
                  required
                />
                {passwordError.longitud && (
                  <span className="error-message">
                    La contraseña debe tener al menos 8 caracteres
                  </span>
                )}
              </div>
              <div className="form-group">
                <label>Confirmar Nueva Contraseña</label>
                <input
                  type="password"
                  name="confirmar"
                  value={formPassword.confirmar}
                  onChange={handlePasswordChange}
                  required
                />
                {passwordError.coincidencia && (
                  <span className="error-message">
                    Las contraseñas no coinciden
                  </span>
                )}
              </div>
              <div className="modal-actions">
                <button 
                  type="submit" 
                  className="action-button primary"
                  disabled={passwordError.longitud || passwordError.coincidencia || formPassword.nueva.length < 8}
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Editar Perfil */}
      {mostrarModalEditar && (
        <div className="modal-overlay" onClick={() => setMostrarModalEditar(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button 
              className="cerrar-modal"
              onClick={() => setMostrarModalEditar(false)}
            >
              ×
            </button>
            <h2>Editar Perfil</h2>
            <form onSubmit={handleEditarPerfil}>
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  value={formPerfil.nombre}
                  onChange={e => setFormPerfil({...formPerfil, nombre: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={formPerfil.email}
                  onChange={e => setFormPerfil({...formPerfil, email: e.target.value})}
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="submit" className="action-button primary">
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default User
