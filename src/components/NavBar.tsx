import './NavBar.css'
import { Link, NavLink } from 'react-router-dom'

interface NavBarProps {
    isActive: boolean;
    isMenuOpen: boolean;
    onMenuToggle: () => void;
}

function NavBar({ isActive, isMenuOpen, onMenuToggle }: NavBarProps) {


    const logout = () => {
        localStorage.removeItem('token');
    }

  return (
    <div className={isActive ? 'navbar-activate' : 'navbar'}>
        <div className='navbar-section'>
            <header>
                <span>Hydrop</span>
                <img src="/assets/img/logo-hydrop.png" alt="" />
            </header>
            <nav>
                <ul>

                    <NavLink  to="/home" className={({isActive}) => isActive ? 'active' : ''}>
                        <img src="/assets/svg/navbar/home.svg" alt="" /> 
                        <p>Inicio</p>
                    </NavLink>

                </ul>
                <ul>
                    <NavLink  to="/stations" className={({isActive}) => isActive ? 'active' : ''}   >
                        <img src="/assets/svg/navbar/hydroponic.svg" alt="" /> 
                        <p>Estaciones</p>
                    </NavLink>


                </ul>
                <ul>
                    <NavLink to="/plants" className={({isActive}) => isActive ? 'active' : ''}  >
                        <img src="/assets/svg/navbar/plants.svg" alt="" /> 
                        <p>Plantas</p>
                    </NavLink>  

                </ul>
                <ul>
                    <NavLink to="/stats" className={({isActive}) => isActive ? 'active' : ''}>
                        <img src="/assets/svg/navbar/stats.svg" alt="" /> 
                        <p>Estadistícas</p>
                    </NavLink>  

                </ul>
            </nav>
            <footer>
                <ul>
                    <NavLink to="/settings" className={({isActive}) => isActive ? 'active' : ''}>
                        <img src="/assets/svg/navbar/settings.svg" alt="" /> 
                        <p>Ajustes</p>
                    </NavLink>  

                </ul>
                <ul>
                    <Link to="/login" onClick={() => logout()}>
                        <img className='navbar-exit' src="/assets/svg/navbar/exit.svg" alt="" /> 
                        <p>Salir</p>
                    </Link>  

                </ul>
            </footer>
        </div>
        <button onClick={onMenuToggle} className={isMenuOpen ? 'navbar-exit-deactivate' : 'navbar-exit-activate'} ></button>
    </div>
  )
}

export default NavBar