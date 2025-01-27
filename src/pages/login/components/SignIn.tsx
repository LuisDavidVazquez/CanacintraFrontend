import './Sign.css'

function SignIn() {
  return (
    <div className='sign'>
      <img className='user' src="assets/img/logo-hydrop.png" alt="" /><br />
      <h1>Inicio de sesión</h1>
      <span>Bienvenido, ingresa tus datos</span>
        <form>
          <div className='input-container'>
            <input type='text' required/>
            <img className='icon' src="assets/svg/email.svg" alt="" />
            <label htmlFor="">Correo</label>
          </div>
          <div className='input-container'>
            <input type='password' required/>
            <img className='icon' src="assets/svg/password.svg" alt="" />
            <label htmlFor="">Contraseña</label>
          </div>
          <button type='submit'>Iniciar Sesión</button>
        </form>
    </div>
  )
}

export default SignIn