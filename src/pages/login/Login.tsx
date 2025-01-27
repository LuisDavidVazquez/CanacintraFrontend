import './Login.css'
import Title from '../../utils/Title'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'


function Login() {

  return (  
    <div className='login'>
      <Title subtitle="Iniciar Sesión"/>
      <div className='container'>
        <SignIn/>
        {/*<SignUp/>*/}
      </div>
    </div>
  )
}

export default Login