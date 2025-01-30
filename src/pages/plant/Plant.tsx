import { useState } from 'react'
import './Plant.css'

interface PlantInfo {
  id: number
  nombre: string
  imagen: string
  descripcion: string
  parametros: {
    temperatura: { min: number; max: number }
    humedad: { min: number; max: number }
    ph: { min: number; max: number }
    ec: { min: number; max: number }
  }
}

function Plant() {
  const [selectedPlant, setSelectedPlant] = useState<PlantInfo | null>(null)

  const plantas: PlantInfo[] = [
    {
      id: 1,
      nombre: "Albahaca",
      imagen: "🌿",
      descripcion: "Hierba aromática perfecta para cocina italiana y ensaladas.",
      parametros: {
        temperatura: { min: 18, max: 25 },
        humedad: { min: 60, max: 70 },
        ph: { min: 5.5, max: 6.5 },
        ec: { min: 1.0, max: 1.6 }
      }
    },
    {
      id: 2,
      nombre: "Lechuga",
      imagen: "🥬",
      descripcion: "Verdura de hoja verde ideal para ensaladas y sándwiches.",
      parametros: {
        temperatura: { min: 15, max: 22 },
        humedad: { min: 60, max: 70 },
        ph: { min: 6.0, max: 7.0 },
        ec: { min: 0.8, max: 1.2 }
      }
    },
    {
      id: 3,
      nombre: "Tomate",
      imagen: "🍅",
      descripcion: "Fruto versátil rico en licopeno y vitamina C.",
      parametros: {
        temperatura: { min: 20, max: 27 },
        humedad: { min: 50, max: 70 },
        ph: { min: 5.5, max: 6.5 },
        ec: { min: 2.0, max: 3.5 }
      }
    },
    {
      id: 4,
      nombre: "Apio",
      imagen: "🥬",
      descripcion: "Vegetal crujiente rico en fibra y minerales.",
      parametros: {
        temperatura: { min: 15, max: 21 },
        humedad: { min: 60, max: 70 },
        ph: { min: 6.0, max: 6.8 },
        ec: { min: 1.8, max: 2.4 }
      }
    },
    {
      id: 5,
      nombre: "Cilantro",
      imagen: "🌿",
      descripcion: "Hierba aromática esencial en la cocina mexicana.",
      parametros: {
        temperatura: { min: 18, max: 24 },
        humedad: { min: 50, max: 60 },
        ph: { min: 6.0, max: 6.7 },
        ec: { min: 1.3, max: 1.8 }
      }
    },
    {
      id: 6,
      nombre: "Rúcula",
      imagen: "🥬",
      descripcion: "Verdura de hoja con sabor picante y nutritiva.",
      parametros: {
        temperatura: { min: 16, max: 24 },
        humedad: { min: 60, max: 70 },
        ph: { min: 6.0, max: 7.0 },
        ec: { min: 1.0, max: 1.6 }
      }
    },
    {
      id: 7,
      nombre: "Espinaca",
      imagen: "🥬",
      descripcion: "Verdura de hoja verde rica en hierro y vitaminas.",
      parametros: {
        temperatura: { min: 15, max: 23 },
        humedad: { min: 60, max: 70 },
        ph: { min: 6.0, max: 7.0 },
        ec: { min: 1.8, max: 2.3 }
      }
    },
    {
      id: 8,
      nombre: "Perejil",
      imagen: "🌿",
      descripcion: "Hierba aromática versátil rica en vitamina C.",
      parametros: {
        temperatura: { min: 15, max: 23 },
        humedad: { min: 60, max: 70 },
        ph: { min: 6.0, max: 6.5 },
        ec: { min: 1.0, max: 1.4 }
      }
    }
  ]

  return (
    <div style={{overflowY: 'scroll', scrollbarWidth: 'none'}}>
      <div className="plant-container">
      <h1>Catálogo de Plantas</h1>
      <div className="plant-grid">
        {plantas.map((planta) => (
          <div 
            key={planta.id} 
            className="plant-card"
            onClick={() => setSelectedPlant(planta)}
          >
            <div className="plant-icon">{planta.imagen}</div>
            <h3>{planta.nombre}</h3>
            <p>{planta.descripcion}</p>
          </div>
        ))}
      </div>

      {selectedPlant && (
        <div className="modal-overlay" onClick={() => setSelectedPlant(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button 
              className="close-button"
              onClick={() => setSelectedPlant(null)}
            >
              ×
            </button>
            <div className="modal-header">
              <div className="plant-icon-large">{selectedPlant.imagen}</div>
              <h2>{selectedPlant.nombre}</h2>
            </div>
            <p className="plant-description">{selectedPlant.descripcion}</p>
            <div className="parameters-grid">
              <div className="parameter-card">
                <h4>Temperatura</h4>
                <p>{selectedPlant.parametros.temperatura.min}°C - {selectedPlant.parametros.temperatura.max}°C</p>
              </div>
              <div className="parameter-card">
                <h4>Humedad</h4>
                <p>{selectedPlant.parametros.humedad.min}% - {selectedPlant.parametros.humedad.max}%</p>
              </div>
              <div className="parameter-card">
                <h4>pH</h4>
                <p>{selectedPlant.parametros.ph.min} - {selectedPlant.parametros.ph.max}</p>
              </div>
              <div className="parameter-card">
                <h4>EC (mS/cm)</h4>
                <p>{selectedPlant.parametros.ec.min} - {selectedPlant.parametros.ec.max}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  )

}

export default Plant