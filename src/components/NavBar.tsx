import './NavBar.css'
import { NavLink } from 'react-router-dom'

function NavBar() {
  return (
    <div className='navbar'>
        <div className='navbar-section'>
            <header>
                <span>Hydrop</span>
                <img src="assets/img/logo-hydrop.png" alt="" />
            </header>
            <nav>
                <ul>
                    <NavLink to="/home" className={({isActive}) => isActive ? 'active' : ''}>
                        <img src="assets/svg/navbar/home.svg" alt="" /> 
                        <p>Inicio</p>
                    </NavLink>
                </ul>
                <ul>
                    <NavLink  to="/stations" className={({isActive}) => isActive ? 'active' : ''}   >
                        <img src="assets/svg/navbar/hydroponic.svg" alt="" /> 
                        <p>Estaciones</p>
                    </NavLink>

                </ul>
                <ul>
                    <NavLink to="/plants" className={({isActive}) => isActive ? 'active' : ''}  >
                        <img src="assets/svg/navbar/plants.svg" alt="" /> 
                        <p>Plantas</p>
                    </NavLink>  
                </ul>
                <ul>
                    <NavLink to="/stats" className={({isActive}) => isActive ? 'active' : ''}>
                        <img src="assets/svg/navbar/stats.svg" alt="" /> 
                        <p>Estadistícas</p>
                    </NavLink>  
                </ul>
            </nav>
            <footer>
                <ul>
                    <a href="">
                        <img src="assets/svg/navbar/settings.svg" alt="" /> 
                        <p>Ajustes</p>
                    </a>  
                </ul>
                <ul>
                    <a href="">
                        <img className='navbar-exit' src="assets/svg/navbar/exit.svg" alt="" /> 
                        <p>Salir</p>
                    </a>  
                </ul>
            </footer>
        </div>
        {/*<div>
            <button>Salir</button>
        </div>*/}
    </div>
  )
}

export default NavBar