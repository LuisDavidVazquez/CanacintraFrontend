import './Sign.css'
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function SignIn() {

  const navigate = useNavigate();
  const url = import.meta.env.VITE_URL_BACKEND;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    console.log(email, password);

    await axios.post(`${url}/auth/login`, {
      email, 
      password 
    }).then((res) => {
      if (res.data) { 
        Swal.fire({
          title: 'Inicio de sesión exitoso',
          icon: 'success'
        });
        navigate('/home');
        localStorage.setItem('token', res.data.access_token);
      } else {
        Swal.fire({
          title: 'Correo o contraseña incorrectos',
          icon: 'error'
        });
      }
    }).catch((err ) => {
      console.log(err);
      Swal.fire({
        title: 'Correo o contraseña incorrectos',
        icon: 'error'
      });
    });


  };



  return (
    <div className='sign'>
      <img className='user' src="assets/img/logo-hydrop.png" alt="" /><br />
      <h1>Inicio de sesión</h1>
      <span>Bienvenido, ingresa tus datos</span>
        <form onSubmit={handleSubmit}>
          <div className='input-container'>
            <input type='text' name='email' required/>
            <img className='icon' src="assets/svg/email.svg" alt="" />
            <label htmlFor="">Correo</label>
          </div>
          <div className='input-container'>
            <input type='password' name='password' required/>
            <img className='icon' src="assets/svg/password.svg" alt="" />
            <label htmlFor="">Contraseña</label>
          </div>
          <button type='submit'>Iniciar Sesión</button>
        </form>
    </div>
  )
}

export default SignIn