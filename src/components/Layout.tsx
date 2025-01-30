import { Outlet, useLocation } from 'react-router-dom'
import { useState } from 'react'
import NavBar from './NavBar'
import Header from './Header'
import Title from '../utils/Title'
import './Layout.css'


const Layout = () => {

  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/home':
        return 'Inicio '
      case '/stations':
        return 'Estaciones'
      case '/plants':
        return 'Plantas'
      case '/stats':
        return 'Estadísticas'
      case '/settings':
        return 'Configuración'
      case '/sensors':
        return 'Sensores'
      default:
        return ''
    }
  }

  interface HeaderProps {
    title: string;
    image: string;
  }

  const getHeader = (): HeaderProps => {
    // Obtener la ruta principal (primera parte del path)
    const mainPath = '/' + location.pathname.split('/')[1];
    
    switch (mainPath) {
      case '/home':
        return {
          title: 'Inicio',
          image: '/assets/svg/navbar/home.svg'
        }
      case '/stations':
        return {
          title: 'Estaciones',
          image: '/assets/svg/navbar/hydroponic.svg'
        }
      case '/plants':
        return {
          title: 'Plantas',
          image: '/assets/svg/navbar/plants.svg'
        }
      case '/stats':
        return {
          title: 'Estadísticas',
          image: '/assets/svg/navbar/stats.svg'
        }
      case '/settings':
        return {
          title: 'Ajustes',
          image: '/assets/svg/navbar/settings.svg'
        }
      case '/sensors':
        return {
          title: 'Sensores',
          image: '/assets/svg/header/sensors.svg'
        }
      default:
        return {
          title: '',
          image: '/assets/svg/navbar/home.svg'
        }
    }
  }

  return (
    <div className="layout">
      <NavBar isActive={isMenuOpen} isMenuOpen={isMenuOpen} onMenuToggle={handleMenuToggle} />
      <div className="main-content">
        <Title subtitle={getPageTitle()} />
        <Header title={getHeader().title} image={getHeader().image}  isMenuOpen={isMenuOpen} onMenuToggle={handleMenuToggle}/>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
