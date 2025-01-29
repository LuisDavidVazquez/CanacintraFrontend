import { useState } from 'react'
import './ControlCultivos.css'

interface PlantaBase {
  id: number
  category: string
  status: 'creciendo' | 'cosechado' | 'marchito'
  plantingDate: string
  estimatedHarvestDate: string
  image: string
}

interface PlantaActiva extends PlantaBase {
  status: 'creciendo' | 'marchito'
  slot: number
}

interface PlantaCosechada extends PlantaBase {
  status: 'cosechado'
}

type Planta = PlantaActiva | PlantaCosechada

const CATEGORIAS_PLANTAS = [
  { valor: 'Lechuga', imagen: '/assets/img/plants/lettuce.png' },
  { valor: 'Rúcula', imagen: '/assets/img/plants/rucula.png' },
  { valor: 'Cilantro', imagen: '/assets/img/plants/cilantro.png' },
  { valor: 'Albahaca', imagen: '/assets/img/plants/albahaca.png' }
]

const MAX_SLOTS = 21

const ControlCultivos = () => {
  const [plantaSeleccionada, setPlantaSeleccionada] = useState<Planta | null>(null)
  const [errorImagen, setErrorImagen] = useState<{[key: number]: boolean}>({})
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [mostrarCosechadas, setMostrarCosechadas] = useState(false)
  const [nuevaPlanta, setNuevaPlanta] = useState({
    categoria: '',
    slot: 1
  })

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

  const plantasActivas = plantas.filter(p => p.status !== 'cosechado')
  const plantasCosechadas = plantas.filter(p => p.status === 'cosechado')
  const slotsOcupados = new Set(plantasActivas.map(p => p.slot))

  const slotsDisponibles = Array.from({ length: MAX_SLOTS }, (_, i) => i + 1)
    .filter(slot => !slotsOcupados.has(slot))

  const agregarPlanta = () => {
    // Aquí implementarías la lógica para agregar la planta a tu backend
    console.log('Nueva planta:', nuevaPlanta)
    setMostrarFormulario(false)
    setNuevaPlanta({ categoria: '', slot: 1 })
  }

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
      <div className="controles">
        <button 
          className="boton-agregar"
          onClick={() => setMostrarFormulario(true)}
          disabled={slotsDisponibles.length === 0}
        >
          Agregar Nueva Planta
        </button>
        <button 
          className="boton-cosechadas"
          onClick={() => setMostrarCosechadas(true)}
        >
          Historial de Plantas Cosechadas
        </button>
      </div>

      <div className="plantas-grid">
        {plantasActivas.map((planta) => (
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

      {mostrarFormulario && (
        <div className="modal-overlay" onClick={() => setMostrarFormulario(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="cerrar-modal" onClick={() => setMostrarFormulario(false)}>×</button>
            <h2>Agregar Nueva Planta</h2>
            <div className="formulario-planta">
              <div className="campo-formulario">
                <label>Categoría:</label>
                <select 
                  value={nuevaPlanta.categoria}
                  onChange={e => setNuevaPlanta({...nuevaPlanta, categoria: e.target.value})}
                >
                  <option value="">Selecciona una categoría</option>
                  {CATEGORIAS_PLANTAS.map(cat => (
                    <option key={cat.valor} value={cat.valor}>{cat.valor}</option>
                  ))}
                </select>
              </div>
              <div className="campo-formulario">
                <label>Slot:</label>
                <select 
                  value={nuevaPlanta.slot}
                  onChange={e => setNuevaPlanta({...nuevaPlanta, slot: Number(e.target.value)})}
                >
                  {slotsDisponibles.map(slot => (
                    <option key={slot} value={slot}>Slot {slot}</option>
                  ))}
                </select>
              </div>
              <button 
                className="boton-guardar"
                onClick={agregarPlanta}
                disabled={!nuevaPlanta.categoria || !nuevaPlanta.slot}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {mostrarCosechadas && (
        <div className="modal-overlay" onClick={() => setMostrarCosechadas(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="cerrar-modal" onClick={() => setMostrarCosechadas(false)}>×</button>
            <h2>Historial de Plantas Cosechadas</h2>
            <div className="lista-cosechadas">
              {plantasCosechadas.map(planta => (
                <div key={planta.id} className="planta-cosechada">
                  <img src={planta.image} alt={planta.category} />
                  <div className="info-cosechada">
                    <h3>{planta.category}</h3>
                    <p>Fecha de cosecha: {planta.estimatedHarvestDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {plantaSeleccionada && (
        <div className="modal-overlay" onClick={cerrarDetalles}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="cerrar-modal" onClick={cerrarDetalles}>×</button>
            <div className="modal-header">
              <img src={plantaSeleccionada.image} alt={plantaSeleccionada.category} />
              <h2>{plantaSeleccionada.category}</h2>
            </div>
            <div className="modal-info">
              {'slot' in plantaSeleccionada && (
                <p><strong>Espacio: </strong>{plantaSeleccionada.slot}</p>
              )}
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
