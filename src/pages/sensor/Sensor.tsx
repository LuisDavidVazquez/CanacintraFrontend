import SensorBox from './components/SensorBox'
import './Sensor.css'
import { useState } from 'react'

const sensorData = [
  {
    title: 'Temperatura',
    value: 25,
    unit: '°C',
    imageUrl: '/assets/img/sensor/temperature.png'
  },
  {
    title: 'Humedad',
    value: 85,
    unit: '%',
    imageUrl: '/assets/img/sensor/humidity.png'
  },
  {
    title: 'pH',
    value: 6.5,
    unit: 'pH',
    imageUrl: '/assets/img/sensor/ph.png'
  },
  {
    title: 'Conductividad',
    value: 1.2,
    unit: 'ppm',
    imageUrl: '/assets/img/sensor/conductivity.png'
  },
  {
    title: 'Nivel de Agua',
    value: 80,
    unit: '%',
    imageUrl: '/assets/img/sensor/bucket.png'
  }
]

function Sensor() {

  const [isPowerOnPump, setIsPowerOnPump] = useState(false);
  const [isPowerOnNutrients, setIsPowerOnNutrients] = useState(false);


  const handlePowerOnPump = () => {
    setIsPowerOnPump(!isPowerOnPump);
  }

  const handlePowerOnNutrients = () => {
    setIsPowerOnNutrients(!isPowerOnNutrients);
  }


  return (
    <div style={{ overflow: 'scroll', scrollbarWidth: 'none' }}>
      <div className='sensor'>
        <div className='sensor-container1'>
          <h1>Estado de la hidroponia</h1>
          <div className='sensor-container1-items'>
            <div className='sensor-container1-items-item'>
              <div className='sensor-container1-actuators'>
                <h2>Bomba de agua</h2>
                <img src={'/assets/img/sensor/pump.png'} alt='Bomba de agua' />
              </div>
              <button onClick={handlePowerOnPump}>
                <img className='sensor-container1-power' src={isPowerOnPump ? '/assets/img/sensor/on.png' : '/assets/img/sensor/off.png'} alt='Bomba de agua' />
              </button>

            </div>
            <div className='sensor-container1-items-item'>

              <div className='sensor-container1-actuators'>
                <h2>Nutrientes</h2><br />
                <img src={'/assets/img/sensor/mineral.png'} alt='Bomba de agua' />
              </div>
              <button onClick={handlePowerOnNutrients}>
                <img className='sensor-container1-power' src={isPowerOnNutrients ? '/assets/img/sensor/on.png' : '/assets/img/sensor/off.png'} alt='Bomba de agua' />
              </button>
            </div>

          </div>
        </div>



        <div className='sensor-container2'>
          {sensorData.map((sensor, index) => (
            <SensorBox
              key={index}
              title={sensor.title}
              value={sensor.value}
              unit={sensor.unit}
              imageUrl={sensor.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sensor