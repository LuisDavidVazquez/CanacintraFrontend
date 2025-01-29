import { useState } from 'react'
import './SellerProfile.css'

interface Producto {
  id: number
  nombre: string
  descripcion: string
  precio: number
  imagen: string
  disponible: boolean
}

const SellerProfile = () => {
  const [productos] = useState<Producto[]>([
    {
      id: 1,
      nombre: 'Lechuga Fresca',
      descripcion: 'Lechuga orgánica cultivada en hidroponía',
      precio: 25.00,
      imagen: '/assets/img/plants/lettuce.png',
      disponible: true
    },
    {
        id: 2,
        nombre: 'Rúcula Fresca',
        descripcion: 'Rúcula orgánica cultivada en hidroponía',
        precio: 30.00,
        imagen: '/assets/img/plants/rucula.png',
        disponible: true
    },
    {
        id: 3,
        nombre: 'Cilantro Fresco',
        descripcion: 'Cilantro orgánico cultivado en hidroponía',
        precio: 20.00,
        imagen: '/assets/img/plants/cilantro.png',
        disponible: true
    },
    {
        id: 4,
        nombre: 'Albahaca Fresca',
        descripcion: 'Albahaca orgánica cultivada en hidroponía',
        precio: 25.00,
        imagen: '/assets/img/plants/albahaca.png',
        disponible: true
    }

  ])

  return (
    <div className="seller-profile">
      {/* Header con información del vendedor */}
      <div className="seller-header">
        <div className="seller-info">
          <img 
            src="/assets/img/HIBO.jpg" 
            alt="Logo de la tienda" 
            className="seller-logo"
          />
          <div className="seller-details">
            <h1>HIBO Huertos, Insumos e Hidroponia</h1>
            <p className="seller-slogan">Producimos y vendemos hortalizas Promovemos el autocultivo, damos cursos, talleres y vendemos insumos</p>
          </div>
        </div>
        <div className="seller-contact">
          <h3>Contacto</h3>
          <p>📞 (961) 269 4403</p>
          <p>📧 hibohidroponia@gmail.com</p>
          <p>📍 Calle Faisanes 1850 Fracc. Lomas del Venado, Tuxtla Gutiérrez, Mexico</p>
        </div>
      </div>

      {/* Sección principal */}
      <div className="main-content">
        {/* Productos */}
        <section className="products-section">
          <h2>Nuestros Productos</h2>
          <div className="products-grid">
            {productos.map(producto => (
              <div key={producto.id} className="product-card">
                <img src={producto.imagen} alt={producto.nombre} />
                <h3>{producto.nombre}</h3>
                <p>{producto.descripcion}</p>
                <p className="price">${producto.precio.toFixed(2)}</p>
                <span className={`status ${producto.disponible ? 'available' : 'sold'}`}>
                  {producto.disponible ? 'Disponible' : 'Agotado'}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Sección "Por qué nosotros" */}
        <section className="why-us">
          <h2>¿Por qué elegir nuestros productos?</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <span className="icon">🌱</span>
              <h3>100% Orgánico</h3>
              <p>Cultivamos sin pesticidas ni químicos dañinos</p>
            </div>
            <div className="benefit-card">
              <span className="icon">💧</span>
              <h3>Hidroponía</h3>
              <p>Sistema de cultivo moderno y eficiente</p>
            </div>
            <div className="benefit-card">
              <span className="icon">🚚</span>
              <h3>Entrega Local</h3>
              <p>Productos frescos directo a tu puerta</p>
            </div>
          </div>
        </section>

        {/* Consejos y Tips */}
        <section className="tips-section">
          <h2>Consejos de Cultivo</h2>
          <div className="tips-grid">
            <div className="tip-card">
              <h3>Cuidado de Plantas</h3>
              <p>Mantén tus plantas hidratadas y en un lugar con luz adecuada</p>
            </div>
            <div className="tip-card">
              <h3>Cosecha</h3>
              <p>Aprende el momento ideal para cosechar cada tipo de planta</p>
            </div>
            <div className="tip-card">
              <h3>Almacenamiento</h3>
              <p>Tips para mantener tus vegetales frescos por más tiempo</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default SellerProfile
