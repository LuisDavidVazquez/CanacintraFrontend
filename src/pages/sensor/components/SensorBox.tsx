import './SensorBox.css'

interface SensorBoxProps {
  title?: string;
  value?: string | number;
  unit?: string;
  imageUrl?: string;
}

function SensorBox({ title, value, unit, imageUrl }: SensorBoxProps) {
  // Obtener parámetros de la URL

  return (
    <div className='sensorBox'>
      <div className='sensorBox-info'>
        <h1>{title}</h1><br />
        <h2>{value } {unit}</h2>
      </div>
      <div className='sensorBox-img'>
        <img src={imageUrl} alt={title} />
      </div>
    </div>
  )
}

export default SensorBox