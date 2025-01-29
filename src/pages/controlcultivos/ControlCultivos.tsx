import { useState } from 'react'
import './ControlCultivos.css'

interface Planta {
  id: number
  slot: number
  category: string
  status: 'creciendo' | 'cosechado' | 'marchito'
  plantingDate: string
  estimatedHarvestDate: string
  image: string
}

const ControlCultivos = () => {
  const [plantaSeleccionada, setPlantaSeleccionada] = useState<Planta | null>(null)
  const [errorImagen, setErrorImagen] = useState<{[key: number]: boolean}>({})

  // Datos de ejemplo - esto debería venir de tu API
  const plantas: Planta[] = [
    {
      id: 1,
      slot: 1,
      category: 'Lechuga',
      status: 'creciendo',
      plantingDate: '2024-03-15',
      estimatedHarvestDate: '2024-04-15',
      image: '/assets/img/plants/lettuce.png'
    },
    {
      id: 2,
      slot: 2,
      category: 'Rúcula',
      status: 'cosechado',
      plantingDate: '2024-02-01',
      estimatedHarvestDate: '2024-03-15',
      image: '/assets/img/plants/rucula.png'
    },
    {
      id: 3,
      slot: 3,
      category: 'Cilantro',
      status: 'marchito',
      plantingDate: '2024-01-10',
      estimatedHarvestDate: '2024-02-20',
      image: '/assets/img/plants/cilantro.png'
    },
    {
      id: 4,
      slot: 4,
      category: 'Apio',
      status: 'creciendo',
      plantingDate: '2024-01-10',
      estimatedHarvestDate: '2024-02-20',
      image: '/assets/img/plants/apio.png'
    },
    {
      id: 5,
      slot: 5,
      category: 'Albahaca',
      status: 'creciendo',
      plantingDate: '2024-01-10',
      estimatedHarvestDate: '2024-02-20',
      image: '/assets/img/plants/albahaca.png'
    }
  ]

  const abrirDetalles = (planta: Planta) => {
    setPlantaSeleccionada(planta)
  }

  const cerrarDetalles = () => {
    setPlantaSeleccionada(null)
  }

  const obtenerColorEstado = (estado: string) => {
    switch (estado) {
      case 'creciendo':
        return '#11ae0b'
      case 'cosechado':
        return '#ffc107'
      case 'marchito':
        return '#dc3545'
      default:
        return '#000000'
    }
  }

  const capitalizarPrimeraLetra = (texto: string) => {
    return texto.charAt(0).toUpperCase() + texto.slice(1)
  }

  const handleImageError = (plantaId: number) => {
    console.error(`Error al cargar la imagen de la planta ${plantaId}`)
    setErrorImagen(prev => ({...prev, [plantaId]: true}))
  }

  return (
    <div className="control-cultivos">
      <div className="plantas-grid">
        {plantas.map((planta) => (
          <div 
            key={planta.id} 
            className="planta-card"
            onClick={() => abrirDetalles(planta)}
          >
            <div className="slot-number">Espacio {planta.slot}</div>
            <img 
              src={planta.image} 
              alt={planta.category}
              onError={() => handleImageError(planta.id)}
            />
            {errorImagen[planta.id] && (
              <div className="error-imagen">
                Error al cargar la imagen
              </div>
            )}
            <h3>{planta.category}</h3>
            <span 
              className="estado-badge"
              style={{ backgroundColor: obtenerColorEstado(planta.status) }}
            >
              {capitalizarPrimeraLetra(planta.status)}
            </span>
          </div>
        ))}
      </div>

      {plantaSeleccionada && (
        <div className="modal-overlay" onClick={cerrarDetalles}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="cerrar-modal" onClick={cerrarDetalles}>×</button>
            <div className="modal-header">
              <img src={plantaSeleccionada.image} alt={plantaSeleccionada.category} />
              <h2>{plantaSeleccionada.category}</h2>
            </div>
            <div className="modal-info">
              <p><strong>Espacio: </strong>{plantaSeleccionada.slot}</p>
              <p>
                <strong>Estado: </strong>
                <span style={{ color: obtenerColorEstado(plantaSeleccionada.status) }}>
                  {capitalizarPrimeraLetra(plantaSeleccionada.status)}
                </span>
              </p>
              <p><strong>Fecha de siembra: </strong>{plantaSeleccionada.plantingDate}</p>
              <p><strong>Fecha estimada de cosecha: </strong>{plantaSeleccionada.estimatedHarvestDate}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ControlCultivos
