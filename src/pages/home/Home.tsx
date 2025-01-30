import { useState } from 'react'
import './Home.css'
import Title from '../../utils/Title'

interface SystemStats {
  id: number
  nombre: string
  plantasCosechadas: number
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

  return (
    <div className="home">
      <Title subtitle="Dashboard"/>
      <div className="stats-section">
        <div className="stats-header">
          <h2>Estadísticas</h2>
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