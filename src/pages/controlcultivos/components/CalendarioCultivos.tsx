import { useState } from 'react'
import './CalendarioCultivos.css'

interface Evento {
  id: number
  tipo: 'siembra' | 'cosecha' | 'marchito'
  fecha: string
  planta: string
}

interface PlantaBase {
  id: number
  category: string
  status: 'creciendo' | 'cosechado' | 'marchito'
  createdAt: string    // Fecha de siembra/creación
  updatedAt: string    // Última actualización (fecha de cosecha o marchitado)
  slot: number
  image: string
}

interface CalendarioCultivosProps {
  plantas: PlantaBase[]
  onClose: () => void
}

const CalendarioCultivos = ({ plantas, onClose }: CalendarioCultivosProps) => {
  const [vistaCalendario, setVistaCalendario] = useState(true)
  const [mesActual, setMesActual] = useState(new Date())
  const [eventoSeleccionado, setEventoSeleccionado] = useState<Evento | null>(null)
  const [fechaBusqueda, setFechaBusqueda] = useState('')

  const eventos: Evento[] = [
    // Eventos de siembra (creación) para todas las plantas
    ...plantas.map(p => ({
      id: p.id * 3 - 2,
      tipo: 'siembra' as const,
      fecha: p.createdAt,
      planta: p.category
    })),
    // Eventos de cosecha o marchitado (según el estado final)
    ...plantas
      .filter(p => p.status !== 'creciendo' && p.createdAt !== p.updatedAt)
      .map(p => ({
        id: p.id * 3 - 1,
        tipo: p.status as 'cosecha' | 'marchito',
        fecha: p.updatedAt,
        planta: p.category
      }))
  ].sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())

  const obtenerDiasEnMes = (fecha: Date) => {
    return new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0).getDate()
  }

  const obtenerPrimerDiaSemana = (fecha: Date) => {
    const primerDia = new Date(fecha.getFullYear(), fecha.getMonth(), 1)
    return primerDia.getDay()
  }

  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const obtenerIcono = (tipo: 'siembra' | 'cosecha' | 'marchito') => {
    switch (tipo) {
      case 'siembra': return '🌱'
      case 'cosecha': return '🌾'
      case 'marchito': return '💀'
    }
  }

  const obtenerColor = (tipo: 'siembra' | 'cosecha' | 'marchito') => {
    switch (tipo) {
      case 'siembra': return '#4CAF50'
      case 'cosecha': return '#FFC107'
      case 'marchito': return '#dc3545'
    }
  }

  const mesAnterior = () => {
    setMesActual(new Date(mesActual.getFullYear(), mesActual.getMonth() - 1))
  }

  const mesSiguiente = () => {
    setMesActual(new Date(mesActual.getFullYear(), mesActual.getMonth() + 1))
  }

  const obtenerEventosDelDia = (dia: number) => {
    return eventos.filter(evento => {
      const fechaEvento = new Date(evento.fecha)
      return fechaEvento.getDate() === dia &&
             fechaEvento.getMonth() === mesActual.getMonth() &&
             fechaEvento.getFullYear() === mesActual.getFullYear()
    })
  }

  const mostrarDetallesEvento = (evento: Evento) => {
    setEventoSeleccionado(evento)
  }

  const cerrarDetallesEvento = () => {
    setEventoSeleccionado(null)
  }

  const irAHoy = () => {
    setMesActual(new Date())
  }

  const buscarFecha = (e: React.FormEvent) => {
    e.preventDefault()
    if (fechaBusqueda) {
      const fecha = new Date(fechaBusqueda)
      if (!isNaN(fecha.getTime())) {
        setMesActual(fecha)
      }
    }
  }

  const renderizarCalendario = () => {
    const diasEnMes = obtenerDiasEnMes(mesActual)
    const primerDia = obtenerPrimerDiaSemana(mesActual)
    const diasCalendario = []
    const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

    // Agregar encabezados de días
    diasCalendario.push(
      <div key="headers" className="dias-semana">
        {diasSemana.map(dia => (
          <div key={dia} className="dia-header">{dia}</div>
        ))}
      </div>
    )

    let dias = []
    
    // Agregar espacios vacíos antes del primer día
    for (let i = 0; i < primerDia; i++) {
      dias.push(<div key={`empty-${i}`} className="dia vacio"></div>)
    }

    // Agregar días del mes
    for (let dia = 1; dia <= diasEnMes; dia++) {
      const eventosDelDia = obtenerEventosDelDia(dia)
      dias.push(
        <div key={dia} className={`dia ${eventosDelDia.length > 0 ? 'con-eventos' : ''}`}>
          <span className="numero-dia">{dia}</span>
          <div className="eventos-dia">
            {eventosDelDia.map(evento => (
              <div 
                key={evento.id}
                className="evento-indicador"
                style={{ backgroundColor: obtenerColor(evento.tipo) }}
                onClick={(e) => {
                  e.stopPropagation()
                  mostrarDetallesEvento(evento)
                }}
                title={`${evento.planta} - ${evento.tipo}`}
              >
                {obtenerIcono(evento.tipo)}
              </div>
            ))}
          </div>
        </div>
      )
    }

    diasCalendario.push(<div key="dias" className="dias-grid">{dias}</div>)
    return diasCalendario
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content calendario-modal" onClick={e => e.stopPropagation()}>
        <button className="cerrar-modal" onClick={onClose}>×</button>
        <h2>Calendario de Cultivos</h2>
        
        <div className="calendario-controles">
          <div className="vista-selector">
            <button 
              className={vistaCalendario ? 'activo' : ''} 
              onClick={() => setVistaCalendario(true)}
            >
              Vista Calendario
            </button>
            <button 
              className={!vistaCalendario ? 'activo' : ''} 
              onClick={() => setVistaCalendario(false)}
            >
              Vista Lista
            </button>
          </div>

          <div className="busqueda-fecha">
            <form onSubmit={buscarFecha} className="formulario-busqueda">
              <input
                type="date"
                value={fechaBusqueda}
                onChange={(e) => setFechaBusqueda(e.target.value)}
                className="input-fecha"
              />
              <button type="submit" className="boton-buscar">
                Ir a Fecha
              </button>
            </form>
          </div>
        </div>

        {vistaCalendario ? (
          <div className="calendario-vista">
            <div className="calendario-header">
              <button onClick={mesAnterior}>&lt;</button>
              <h3>
                {mesActual.toLocaleDateString('es-ES', { 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </h3>
              <button onClick={mesSiguiente}>&gt;</button>
            </div>
            <div className="calendario-grid">
              {renderizarCalendario()}
            </div>
          </div>
        ) : (
          <div className="lista-vista">
            {eventos.map(evento => (
              <div 
                key={evento.id} 
                className="evento-lista"
                style={{ borderLeftColor: obtenerColor(evento.tipo) }}
              >
                <span className="evento-icono">{obtenerIcono(evento.tipo)}</span>
                <div className="evento-info">
                  <span className="evento-fecha">{formatearFecha(evento.fecha)}</span>
                  <span className="evento-planta">{evento.planta}</span>
                  <span className="evento-tipo">
                    {evento.tipo === 'siembra' ? 'Sembrado' :
                     evento.tipo === 'cosecha' ? 'Cosechado' : 'Marchitado'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {eventoSeleccionado && (
          <div className="modal-overlay evento-detalle" onClick={cerrarDetallesEvento}>
            <div className="modal-content detalle-evento" onClick={e => e.stopPropagation()}>
              <button className="cerrar-modal" onClick={cerrarDetallesEvento}>×</button>
              <div className="detalle-header">
                <span className="evento-icono-grande" style={{ backgroundColor: obtenerColor(eventoSeleccionado.tipo) }}>
                  {obtenerIcono(eventoSeleccionado.tipo)}
                </span>
                <h3>{eventoSeleccionado.planta}</h3>
              </div>
              <div className="detalle-info">
                <p><strong>Evento: </strong>
                  {eventoSeleccionado.tipo === 'siembra' ? 'Sembrado' :
                   eventoSeleccionado.tipo === 'cosecha' ? 'Cosechado' : 'Marchitado'}
                </p>
                <p><strong>Fecha: </strong>{formatearFecha(eventoSeleccionado.fecha)}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CalendarioCultivos 