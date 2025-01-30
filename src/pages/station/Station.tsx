import { useEffect, useState } from 'react'
import './Station.css'
import HydroponicBox from './components/HydroponicBox'
import { useNavigate } from 'react-router-dom'


// Interfaz para definir la estructura de los datos
interface HydroponicData {
  id: number
  title: string
  subtitle: string
}

function Station() {
  const navigate = useNavigate()
  const [hydroponicData, setHydroponicData] = useState<HydroponicData[]>([])


  const fetchHydroponicData = () => {

    const mockData: HydroponicData[] = [
      {
        id: 1,
        title: "Hidroponia",
        subtitle: "Suchiapa"

      },
      {
        id: 2,
        title: "Hidroponia 2",
        subtitle: "Tuxtla"

      },
      {
        id: 3,
        title: "Hinia 3",
        subtitle: "Tuxtla"

      },
    ]
    setHydroponicData(mockData)
  }

  useEffect(() => {
    fetchHydroponicData()
  }, [])

  const handleHydroponicClick = (id: number) => {
    navigate(`/stations/${id}`)
  }

  return (
    <div style={{ overflowX: 'scroll', scrollbarWidth: 'none' }}>
        <div className="station">
        {hydroponicData.map((item) => (
          <HydroponicBox
            key={item.id}
            title={item.title}
            subtitle={item.subtitle}
            onClick={() => handleHydroponicClick(item.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default Station