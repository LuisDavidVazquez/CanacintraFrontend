import './Landing.css'
import Title from '../../utils/Title'
import { useEffect, useState } from 'react'

function Landing() {
  const [visible, setVisible] = useState(true)
  const [prevScrollPos, setPrevScrollPos] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY
      const isScrollingUp = prevScrollPos > currentScrollPos
      const isAtTop = currentScrollPos < 10

      setVisible(isScrollingUp || isAtTop)
      setPrevScrollPos(currentScrollPos)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prevScrollPos])

  return (
    <div className='landing'>
      <Title subtitle="Bienvenido"/>
      <nav className={`landing-nav ${visible ? 'nav-visible' : 'nav-hidden'}`}>
        <div className='nav-brand'>
          <a href="/">
            <img src="assets/img/logo-hydrop.png" alt="Hydrop Logo" />
            <span>Hydrop</span>
          </a>
        </div>
        <div className='nav-links'>
          <a href="/login">Iniciar Sesión</a>
          <a href="#footer">Contacto</a>
          <a href="#nosotros">Quiénes Somos</a>
        </div>
      </nav>
      <div className='landing-container'>
        <section className='info-box welcome-box'>
          <div className='welcome-content'>
            <h1>Bienvenido a Hydrop</h1>
            <p>La plataforma integral que revoluciona la agricultura hidropónica. Optimiza tus cultivos con tecnología de vanguardia y control preciso en tiempo real.</p>
          </div>
          <img className='welcome-logo' src="assets/img/logo-hydrop.png" alt="Hydrop Logo" />
        </section>

        <section className='services-section'>
          <div className='section-title'>
            <h2>¿Qué ofrecemos?</h2>
          </div>
          <div className='services-grid'>
            <div className='service-item'>
              <h3>Monitoreo en Tiempo Real</h3>
              <p>Supervisa tus cultivos 24/7 con sensores que los cuales se encargan de medir pH, temperatura, humedad y nutrientes.</p>
              <img src="assets/svg/monitor.svg" alt="Monitoreo icon" className="service-icon" />
            </div>
            <div className='service-item'>
              <h3>Control de Estaciones</h3>
              <p>Gestiona múltiples estaciones hidropónicas desde una única interfaz intuitiva y personalizable.</p>
              <img src="assets/svg/control.svg" alt="Control icon" className="service-icon" />
            </div>
            <div className='service-item'>
              <h3>Estadísticas</h3>
              <p>Analiza el rendimiento de tus cultivos con gráficos detallados.</p>
              <img src="assets/svg/stats.svg" alt="Statistics icon" className="service-icon" />
            </div>
            <div className='service-item'>
              <h3>Gestión Inteligente</h3>
              <p>Optimiza recursos con nuestro sistema de automatización y alertas en tiempo real.</p>
              <img src="assets/svg/smart.svg" alt="Smart management icon" className="service-icon" />
            </div>
            <div className='service-item'>
              <h3>Personalización</h3>
              <p>Desarrollamos interfaces personalizadas según tus necesidades específicas, adaptando el sistema a tu modelo de negocio hidropónico.</p>
              <img src="assets/svg/custom.svg" alt="Customization icon" className="service-icon" />
              <div className="service-cta">
                <p>Conoce la tienda de un socio de Hydrop:</p>
                <a href="/sellers/hibo" className="example-link">
                  Ver Tienda HIBO →
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className='info-box'>
          <h2>Características Principales</h2>
          <div className='features-grid'>
            <div className='feature-item'>
              <h3>Sensores IoT de alta precisión</h3>
              <p>Monitoreo constante y preciso de todas las variables críticas de tus cultivos con tecnología de última generación.</p>
            </div>
            <div className='feature-item'>
              <h3>Sistema de control automatizado</h3>
              <p>Automatización inteligente que ajusta las condiciones de cultivo en tiempo real para un crecimiento óptimo.</p>
            </div>
            <div className='feature-item'>
              <h3>Interfaz intuitiva y moderna</h3>
              <p>Panel de control fácil de usar que te permite gestionar tus cultivos desde cualquier dispositivo.</p>
            </div>
            <div className='feature-item'>
              <h3>Soporte técnico especializado</h3>
              <p>Equipo de expertos disponible para ayudarte a optimizar tu sistema y resolver cualquier duda.</p>
            </div>
          </div>
        </section>

        <section className='info-box'>
          <h2>Beneficios Clave</h2>
          <div className='benefits-container'>
            <div className='benefit'>
              <h3>Ahorro de Recursos</h3>
              <p>Reduce hasta un 90% el consumo de agua comparado con la agricultura tradicional.</p>
            </div>
            <div className='benefit'>
              <h3>Mayor Productividad</h3>
              <p>Incrementa el rendimiento de tus cultivos con nuestro sistema optimizado.</p>
            </div>
            <div className='benefit'>
              <h3>Control Total</h3>
              <p>Toma decisiones informadas con datos precisos y en tiempo real.</p>
            </div>
          </div>
        </section>        

        <section className='info-box' id="nosotros">
          <h2>Quiénes Somos</h2>
          <div className='about-container'>
            <div className='about-content'>
              <p>En Hydrop, somos un equipo apasionado por la innovación agrícola y la sostenibilidad. Nacimos con la visión de transformar la agricultura tradicional mediante soluciones tecnológicas avanzadas y accesibles.</p>
              <div className='about-values'>
                <div className='value-item'>
                  <h3>Nuestra Misión</h3>
                  <p>Democratizar el acceso a la agricultura hidropónica mediante tecnología inteligente y sostenible, permitiendo desde personas que quieren cultivar en su casa hasta empresas optimizar sus cultivos de manera eficiente.</p>
                </div>
                <div className='value-item'>
                  <h3>Nuestra Visión</h3>
                  <p>Ser líderes en la transformación digital de la agricultura hidropónica en México, impulsando una producción de alimentos más sostenible y eficiente.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className='landing-footer' id="footer">
        <div className='footer-content'>
          <div className='footer-section'>
            <div className='footer-brand'>
              <img src="assets/img/logo-hydrop.png" alt="Hydrop Logo" />
              <h3>Hydrop</h3>
            </div>
            <p>Revolucionando la agricultura hidropónica con tecnología de vanguardia</p>
          </div>

          <div className='footer-section'>
            <h3>Enlaces Rápidos</h3>
            <ul>
              <li><a href="#inicio">Inicio</a></li>
              <li><a href="#servicios">Servicios</a></li>
              <li><a href="#nosotros">Nosotros</a></li>
              <li><a href="/login">Iniciar Sesión</a></li>
            </ul>
          </div>

          <div className='footer-section'>
            <h3>Contacto</h3>
            <p>¿Estás interesado en adquirir nuestros servicios? Contáctanos</p>
            <div className='contact-info'>
              <div className='contact-item'>
                <img src="assets/svg/email.svg" alt="Email icon" />
                <p>hydrop@bynvm.mx</p>
              </div>
              <div className='contact-item'>
                <img src="assets/svg/phone.svg" alt="Phone icon" />
                <p>(968) 103 4332</p>
              </div>
              <div className='contact-item'>
                <img src="assets/svg/clock.svg" alt="Clock icon" />
                <p>Lunes a Viernes 9:00 - 17:00</p>
              </div>
            </div>
          </div>
        </div>
        <div className='footer-bottom'>
          <p>&copy; 2025 Hydrop. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

export default Landing 