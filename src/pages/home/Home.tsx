import { useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import './Home.css'

ChartJS.register(ArcElement, Tooltip, Legend)

interface SystemStats {
  id: number
  nombre: string
  plantasCosechadas: number
  plantasEnCrecimiento: number
  plantasMarchitas: number
  ultimaCosecha: string
  nivelAgua: number
  categoriasCosechadas: {
    categoria: string
    cantidad: number
  }[]
}

interface UserStats {
  sistemasHidroponicos: SystemStats[]
  totalPlantasCosechadas: number
}

function Home() {
  const [selectedSystem, setSelectedSystem] = useState<number | 'todos'>('todos')
  const [stats] = useState<UserStats>({
    sistemasHidroponicos: [
      {
        id: 1,
        nombre: "Sistema 1",
        plantasCosechadas: 8,
        plantasEnCrecimiento: 12,
        plantasMarchitas: 1,
        ultimaCosecha: "2024-03-15",
        nivelAgua: 85,
        categoriasCosechadas: [
          { categoria: 'Lechuga', cantidad: 4 },
          { categoria: 'Albahaca', cantidad: 2 },
          { categoria: 'Cilantro', cantidad: 2 }
        ]
      },
      {
        id: 2,
        nombre: "Sistema 2",
        plantasCosechadas: 7,
        plantasEnCrecimiento: 15,
        plantasMarchitas: 2,
        ultimaCosecha: "2024-03-14",
        nivelAgua: 72,
        categoriasCosechadas: [
          { categoria: 'Lechuga', cantidad: 4 },
          { categoria: 'Albahaca', cantidad: 2 },
          { categoria: 'Cilantro', cantidad: 1 }
        ]
      }
    ],
    totalPlantasCosechadas: 15
  })

  const getStatsToDisplay = () => {
    if (selectedSystem === 'todos') {
      const allCategories = stats.sistemasHidroponicos.flatMap(
        system => system.categoriasCosechadas
      ).reduce((acc, curr) => {
        const existing = acc.find(item => item.categoria === curr.categoria)
        if (existing) {
          existing.cantidad += curr.cantidad
        } else {
          acc.push({ ...curr })
        }
        return acc
      }, [] as { categoria: string, cantidad: number }[])

      return {
        plantasCosechadas: stats.totalPlantasCosechadas,
        categoriasCosechadas: allCategories
      }
    }

    return stats.sistemasHidroponicos.find(s => s.id === selectedSystem)
  }

  const statsToShow = getStatsToDisplay()

  const getPlantStatusData = () => {
    if (selectedSystem === 'todos') {
      const totals = stats.sistemasHidroponicos.reduce((acc, system) => {
        return {
          cosechadas: acc.cosechadas + system.plantasCosechadas,
          crecimiento: acc.crecimiento + system.plantasEnCrecimiento,
          marchitas: acc.marchitas + system.plantasMarchitas
        }
      }, { cosechadas: 0, crecimiento: 0, marchitas: 0 })

      return {
        labels: ['Cosechadas', 'En Crecimiento', 'Marchitas'],
        datasets: [{
          data: [totals.cosechadas, totals.crecimiento, totals.marchitas],
          backgroundColor: ['#4caf50', '#2196f3', '#f44336'],
          borderWidth: 1
        }]
      }
    }

    const system = stats.sistemasHidroponicos.find(s => s.id === selectedSystem)
    return {
      labels: ['Cosechadas', 'En Crecimiento', 'Marchitas'],
      datasets: [{
        data: [
          system?.plantasCosechadas || 0,
          system?.plantasEnCrecimiento || 0,
          system?.plantasMarchitas || 0
        ],
        backgroundColor: ['#4caf50', '#2196f3', '#f44336'],
        borderWidth: 1
      }]
    }
  }

  return (
    <div className="home">
      {/*<div className="welcome-section">
        <h1>¡Bienvenido a Hydrop!</h1>
        <p>Sistema de monitoreo y control de cultivos hidropónicos</p>
      </div>*/}
      <div className="stats-section">
        <div className="stats-header">
          <h2>Resumen de cultivos</h2>
          <select 
            className="system-selector"
            value={selectedSystem}
            onChange={(e) => setSelectedSystem(e.target.value === 'todos' ? 'todos' : Number(e.target.value))}
          >
            <option value="todos">Todos los sistemas</option>
            {stats.sistemasHidroponicos.map(system => (
              <option key={system.id} value={system.id}>
                {system.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-icon">🌱</span>
            <div className="stat-info">
              <h3>Sistemas Hidropónicos</h3>
              <p className="stat-value">{stats.sistemasHidroponicos.length}</p>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">🌿</span>
            <div className="stat-info">
              <h3>Total Plantas Cosechadas</h3>
              <p className="stat-value">{statsToShow?.plantasCosechadas || 0}</p>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">💧</span>
            <div className="stat-info">
              <h3>Nivel de Agua</h3>
              <p className="stat-value">
                {selectedSystem === 'todos' 
                  ? `${Math.round(stats.sistemasHidroponicos.reduce((acc, sys) => acc + sys.nivelAgua, 0) / stats.sistemasHidroponicos.length)}%`
                  : `${stats.sistemasHidroponicos.find(s => s.id === selectedSystem)?.nivelAgua}%`
                }
              </p>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">📅</span>
            <div className="stat-info">
              <h3>Última Cosecha</h3>
              <p className="stat-value">
                {selectedSystem === 'todos' 
                  ? 'Múltiples fechas'
                  : new Date(stats.sistemasHidroponicos.find(s => s.id === selectedSystem)?.ultimaCosecha || '').toLocaleDateString()
                }
              </p>
            </div>
          </div>
        </div>

        <div className="chart-section">
          <h3>Estado de las Plantas</h3>
          <div className="chart-container">
            <Doughnut 
              data={getPlantStatusData()}
              options={{
                plugins: {
                  legend: {
                    position: 'bottom'
                  }
                }
              }}
            />
          </div>
        </div>

        <h3 className="subcategory-title">
          Plantas Cosechadas por Categoría 
          {selectedSystem !== 'todos' && ` - ${stats.sistemasHidroponicos.find(s => s.id === selectedSystem)?.nombre}`}
        </h3>
        <div className="category-stats-grid">
          {statsToShow?.categoriasCosechadas.map((cat, index) => (
            <div key={index} className="stat-card category-card">
              <div className="stat-info">
                <h3>{cat.categoria}</h3>
                <p className="stat-value">{cat.cantidad}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home