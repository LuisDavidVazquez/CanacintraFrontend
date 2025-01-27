import './NavBar.css'
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
                    <a href="">
                        <img src="assets/svg/navbar/home.svg" alt="" /> 
                        <p>Inicio</p>
                    </a>
                </ul>
                <ul>
                    <a href="">
                        <img src="assets/svg/navbar/hydroponic.svg" alt="" /> 
                        <p>Estaciones</p>
                    </a>

                </ul>
                <ul>
                    <a href="">
                        <img src="assets/svg/navbar/plants.svg" alt="" /> 
                        <p>Plantas</p>
                    </a>  
                </ul>
                <ul>
                    <a href="">
                        <img src="assets/svg/navbar/stats.svg" alt="" /> 
                        <p>Estadistícas</p>
                    </a>  
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