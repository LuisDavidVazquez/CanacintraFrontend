import './Station.css'
import Title from '../../utils/Title' 
import NavBar from '../../components/NavBar'
import Header from '../../components/Header'

function Stations() {
  return (
    <div className='station'>
        <Title subtitle="Estaciones"/>
        <NavBar/>
        <Header/>
        Stations
    </div>
  )
}

export default Stations