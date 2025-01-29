import { useState } from 'react'
import './ControlCultivos.css'
import CalendarioCultivos from './components/CalendarioCultivos'

interface PlantaBase {
  id: number
  category: string
  status: 'creciendo' | 'cosechado' | 'marchitado'
  createdAt: string    // Fecha de siembra/creación
  updatedAt: string    // Última actualización (fecha de cosecha o marchitado)
  slot: number
  image: string
}

interface PlantaActiva extends PlantaBase {
  status: 'creciendo'
  estimatedHarvestDate: string
}

interface PlantaCosechada extends PlantaBase {
  status: 'cosechado'
}

interface PlantaMarchita extends PlantaBase {
  status: 'marchitado'
}

export type Planta = PlantaActiva | PlantaCosechada | PlantaMarchita

const CATEGORIAS_PLANTAS = [
  { valor: 'Lechuga', imagen: '/assets/img/plants/lettuce.png' },
  { valor: 'Rúcula', imagen: '/assets/img/plants/rucula.png' },
  { valor: 'Cilantro', imagen: '/assets/img/plants/cilantro.png' },
  { valor: 'Albahaca', imagen: '/assets/img/plants/albahaca.png' }
]

const ControlCultivos = () => {
  const [plantaSeleccionada, setPlantaSeleccionada] = useState<Planta | null>(null)
  const [errorImagen, setErrorImagen] = useState<{[key: number]: boolean}>({})
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [mostrarCosechadas, setMostrarCosechadas] = useState(false)
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState<'cosecha' | 'eliminacion' | null>(null)
  const [nuevaPlanta, setNuevaPlanta] = useState({
    categoria: '',
    slot: 1
  })
  const [mostrarCalendario, setMostrarCalendario] = useState(false)

  // Datos de ejemplo - esto debería venir de tu API
  const plantas: Planta[] = [
    {
      id: 1,
      slot: 1,
      category: 'Lechuga',
      status: 'creciendo',
      createdAt: '2025-03-15',      // Fecha de siembra
      updatedAt: '2025-03-15',      // Igual a createdAt al inicio
      estimatedHarvestDate: '2025-04-15',
      image: '/assets/img/plants/lettuce.png'
    },
    {
      id: 2,
      slot: 2,
      category: 'Rúcula',
      status: 'cosechado',
      createdAt: '2025-02-01',      // Fecha de siembra en formato YYYY-MM-DD
      updatedAt: '2025-03-15',      // Fecha en que se cosechó
      image: '/assets/img/plants/rucula.png'
    },
    {
      id: 3,
      slot: 3,
      category: 'Cilantro',
      status: 'marchitado',
      createdAt: '2025-01-15',      // Fecha de siembra
      updatedAt: '2025-02-03',      // Fecha en que se marchitó
      image: '/assets/img/plants/cilantro.png'
    },
    {
      id: 4,
      slot: 4,
      category: 'Apio',
      status: 'creciendo',
      createdAt: '2025-01-10',
      updatedAt: '2025-02-20',
      estimatedHarvestDate: '2025-03-10',
      image: '/assets/img/plants/apio.png'
    },
    {
      id: 5,
      slot: 5,
      category: 'Albahaca',
      status: 'creciendo',
      createdAt: '2025-01-10',
      updatedAt: '2025-02-20',
      estimatedHarvestDate: '2025-03-10',
      image: '/assets/img/plants/albahaca.png'
    },

    {
        id: 6,
        slot: 6,
        category: 'Apio',
        status: 'creciendo',
        createdAt: '2025-01-10',
        updatedAt: '2025-02-20',
        estimatedHarvestDate: '2025-03-10',
        image: '/assets/img/plants/apio.png'

    },
    {
        id: 7,
        slot: 7,
        category: 'Apio',
        status: 'creciendo',
        createdAt: '2025-01-10',
        updatedAt: '2025-02-20',
        estimatedHarvestDate: '2025-03-10',
        image: '/assets/img/plants/apio.png'

    },
    {
        id: 8,
        slot: 8,
        category: 'Apio',
        status: 'creciendo',
        createdAt: '2025-01-10',
        updatedAt: '2025-02-20',
        estimatedHarvestDate: '2025-03-10',
        image: '/assets/img/plants/apio.png'
    },
    {
        id: 9,

        slot: 9,
        category: 'Apio',
        status: 'creciendo',
        createdAt: '2025-01-10',
        updatedAt: '2025-02-20',
        estimatedHarvestDate: '2025-03-10',
        image: '/assets/img/plants/apio.png'

    },
    {
        id: 10,
        slot: 10,
        category: 'Cilantro',
        status: 'creciendo',
        createdAt: '2025-01-10',
        updatedAt: '2025-02-20',
        estimatedHarvestDate: '2025-03-10',
        image: '/assets/img/plants/cilantro.png'
    }
  ]


  const plantasActivas = plantas.filter(p => p.status !== 'cosechado')
  const plantasCosechadas = plantas.filter(p => p.status === 'cosechado')

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

  const renderSlot = (slotNumber: number) => {
    const planta = plantasActivas.find(p => p.slot === slotNumber);
    
    if (planta) {
      return (
        <div 
          key={slotNumber}
          className="planta-card"
          onClick={() => abrirDetalles(planta)}
        >
          <div className="slot-number">{slotNumber}</div>
          <img 
            src={planta.image} 
            alt={planta.category}
            onError={() => handleImageError(planta.id)}
          />
          {errorImagen[planta.id] && (
            <div className="error-imagen">Error al cargar la imagen</div>
          )}
          <h3>{planta.category}</h3>
          <span 
            className="estado-badge"
            style={{ backgroundColor: obtenerColorEstado(planta.status) }}
          >
            {capitalizarPrimeraLetra(planta.status)}
          </span>
        </div>
      );
    }

    return (
      <div 
        key={slotNumber}
        className="slot-vacio"
        onClick={() => {
          setNuevaPlanta(prev => ({ ...prev, slot: slotNumber }));
          setMostrarFormulario(true);
        }}
      >
        <div className="slot-number">{slotNumber}</div>
        <div className="slot-placeholder">+</div>
      </div>
    );
  };

  const iniciarCosecha = () => {
    setMostrarConfirmacion('cosecha')
  }

  const iniciarEliminacion = () => {
    setMostrarConfirmacion('eliminacion')
  }

  const confirmarAccion = () => {
    if (!plantaSeleccionada) return

    if (mostrarConfirmacion === 'cosecha') {
      // Aquí implementarías la lógica para marcar como cosechado en tu backend
      console.log('Marcando como cosechado:', plantaSeleccionada.id)
    } else if (mostrarConfirmacion === 'eliminacion') {
      // Aquí implementarías la lógica para eliminar en tu backend
      console.log('Eliminando planta:', plantaSeleccionada.id)
    }

    setMostrarConfirmacion(null)
    setPlantaSeleccionada(null)
  }

  const cancelarAccion = () => {
    setMostrarConfirmacion(null)
  }

  return (
    <div className="control-cultivos">
      <div className="controles">
        <button 
          className="boton-calendario"
          onClick={() => setMostrarCalendario(true)}
        >
          Ver Calendario
        </button>
        <button 
          className="boton-cosechadas"
          onClick={() => setMostrarCosechadas(true)}
        >
          Ver Plantas Cosechadas
        </button>
      </div>

      <div className="torre-hidroponica">
        {Array.from({ length: 7 }, (_, fila) => (
          <div key={fila} className="fila-slots">
            {Array.from({ length: 3 }, (_, columna) => {
              const slotNumber = fila * 3 + columna + 1;
              return renderSlot(slotNumber);
            })}
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
                    <p>Fecha de cosecha: {planta.updatedAt}</p>
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
              <p><strong>Fecha de siembra: </strong>{plantaSeleccionada.createdAt}</p>
              {plantaSeleccionada.status === 'creciendo' && (
                <p><strong>Fecha estimada de cosecha: </strong>{plantaSeleccionada.estimatedHarvestDate}</p>
              )}
            </div>
            {plantaSeleccionada.status === 'creciendo' && (
              <div className="modal-actions">
                <button 
                  className="boton-eliminar"
                  onClick={iniciarEliminacion}
                >
                  Eliminar Planta
                </button>
                <button 
                  className="boton-cosechar"
                  onClick={iniciarCosecha}
                >
                  Marcar como Cosechado
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal de confirmación */}
      {mostrarConfirmacion && (
        <div className="modal-overlay" onClick={cancelarAccion}>
          <div className="modal-content modal-confirmacion" onClick={e => e.stopPropagation()}>
            <h2>
              {mostrarConfirmacion === 'cosecha' ? 'Confirmar Cosecha' : 'Confirmar Eliminación'}
            </h2>
            <p>
              {mostrarConfirmacion === 'cosecha' 
                ? '¿Estás seguro de que deseas marcar esta planta como cosechada?' 
                : '¿Estás seguro de que deseas eliminar esta planta?'}
            </p>
            <div className="modal-actions-confirmacion">
              <button 
                className="boton-cancelar"
                onClick={cancelarAccion}
              >
                Cancelar
              </button>
              <button 
                className={`boton-confirmar ${mostrarConfirmacion === 'eliminacion' ? 'boton-confirmar-eliminar' : ''}`}
                onClick={confirmarAccion}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {mostrarCalendario && (
        <CalendarioCultivos 
          plantas={plantas}
          onClose={() => setMostrarCalendario(false)}
        />
      )}
    </div>
  )
}

export default ControlCultivos
