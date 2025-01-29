import { useState } from 'react'
import './CalendarioCultivos.css'

interface Evento {
  id: number
  tipo: 'siembra' | 'cosecha'
  fecha: string
  planta: string
}

interface CalendarioCultivosProps {
  plantas: any[] // Ajusta este tipo según tu interfaz de Planta
  onClose: () => void
}

const CalendarioCultivos = ({ plantas, onClose }: CalendarioCultivosProps) => {
  const [vistaCalendario, setVistaCalendario] = useState(true)

  // Crear eventos a partir de las plantas
  const eventos: Evento[] = [
    // Eventos de siembra
    ...plantas.map(p => ({
      id: p.id * 2 - 1,
      tipo: 'siembra' as const,
      fecha: p.plantingDate,
      planta: p.category
    })),
    // Eventos de cosecha
    ...plantas
      .filter(p => p.status === 'cosechado')
      .map(p => ({
        id: p.id * 2,
        tipo: 'cosecha' as const,
        fecha: p.estimatedHarvestDate,
        planta: p.category
      }))
  ].sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())

  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const obtenerIcono = (tipo: 'siembra' | 'cosecha') => {
    return tipo === 'siembra' ? '🌱' : '🌾'
  }

  const obtenerColor = (tipo: 'siembra' | 'cosecha') => {
    return tipo === 'siembra' ? '#4CAF50' : '#FFC107'
  }

  const agruparEventosPorMes = () => {
    const eventos_agrupados: { [key: string]: Evento[] } = {}
    
    eventos.forEach(evento => {
      const fecha = new Date(evento.fecha)
      const mes_key = `${fecha.getFullYear()}-${fecha.getMonth()}`
      
      if (!eventos_agrupados[mes_key]) {
        eventos_agrupados[mes_key] = []
      }
      eventos_agrupados[mes_key].push(evento)
    })

    return eventos_agrupados
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content calendario-modal" onClick={e => e.stopPropagation()}>
        <button className="cerrar-modal" onClick={onClose}>×</button>
        <h2>Calendario de Cultivos</h2>
        
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

        {vistaCalendario ? (
          <div className="calendario-vista">
            {Object.entries(agruparEventosPorMes()).map(([mes_key, eventos_mes]) => {
              const [year, month] = mes_key.split('-')
              const nombreMes = new Date(parseInt(year), parseInt(month)).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })
              
              return (
                <div key={mes_key} className="mes-grupo">
                  <h3>{nombreMes}</h3>
                  <div className="eventos-mes">
                    {eventos_mes.map(evento => (
                      <div 
                        key={evento.id} 
                        className="evento-calendario"
                        style={{ borderColor: obtenerColor(evento.tipo) }}
                      >
                        <span className="evento-icono">{obtenerIcono(evento.tipo)}</span>
                        <div className="evento-info">
                          <span className="evento-fecha">{formatearFecha(evento.fecha)}</span>
                          <span className="evento-planta">{evento.planta}</span>
                          <span className="evento-tipo">{evento.tipo === 'siembra' ? 'Sembrado' : 'Cosechado'}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
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
                  <span className="evento-tipo">{evento.tipo === 'siembra' ? 'Sembrado' : 'Cosechado'}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default CalendarioCultivos 