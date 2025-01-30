import './StationDetail.css'
import { NavLink, useParams } from 'react-router-dom'

function StationDetail() {
  const { id } = useParams();

  return (
      <div className="stationDetail">
        <div></div>
        <NavLink className="stationDetail-sensors" to={`/stations/${id}/sensors`}>

          <h1>Sensores</h1>
        </NavLink>
        <NavLink className="stationDetail-plants" to={`/stations/${id}/plants`}>



          <h1>Plantas</h1>
        </NavLink>
      </div>

  )
}

export default StationDetail 