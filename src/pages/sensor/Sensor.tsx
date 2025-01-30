import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import SensorBox from './components/SensorBox';
import './Sensor.css';

// Definición de los sensores iniciales
const initialSensorData = {
  Temperatura: { value: 0, unit: '°C', imageUrl: '/assets/img/sensor/temperature.png' },
  Humedad: { value: 0, unit: '%', imageUrl: '/assets/img/sensor/humidity.png' },
  pH: { value: 0, unit: 'pH', imageUrl: '/assets/img/sensor/ph.png' },
  TDS: { value: 0, unit: 'ppm', imageUrl: '/assets/img/sensor/conductivity.png' },
  Nivel_agua: { value: 0, unit: '%', imageUrl: '/assets/img/sensor/bucket.png' }
};

// Add this type definition at the top of the file, after the imports
type SensorDataType = {
  [K in keyof typeof initialSensorData]: {
    value: number;
    unit: string;
    imageUrl: string;
  };
};

function Sensor() {
  const [sensorData, setSensorData] = useState<SensorDataType>(initialSensorData);
  const [isPowerOnPump, setIsPowerOnPump] = useState(false);
  const [isPowerOnNutrients, setIsPowerOnNutrients] = useState(false);

  // Inicializar Socket.io
  const socket = io("ws://localhost:8080");



  // Conectar a WebSocket y manejar eventos
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Conectado al servidor WebSocket');
    });

    socket.on('disconnect', () => {
      console.log('Desconectado del servidor WebSocket');
    });

    // Evento que actualiza los datos de los sensores
    socket.on('sensor_data', (data) => {
      console.log('Datos de sensores recibidos:', data);
      setSensorData((prevData) => ({
        ...prevData,
        Temperatura: { ...prevData.Temperatura, value: data.Temperatura || prevData.Temperatura.value },
        Humedad: { ...prevData.Humedad, value: data.Humedad || prevData.Humedad.value },
        pH: { ...prevData.pH, value: data.pH || prevData.pH.value },
        TDS: { ...prevData.TDS, value: data.TDS || prevData.TDS.value },
        Nivel_agua: { ...prevData.Nivel_agua, value: data.Nivel_agua || prevData.Nivel_agua.value }
      }));
    });

    // Evento que actualiza el estado de la bomba
    socket.on('pump_status', (data) => {
      console.log('Estado de la bomba recibido:', data);
      setIsPowerOnPump(data.status === 'on');
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  // Manejar el encendido/apagado de la bomba de agua
  const handlePowerOnPump = () => {
    const command = isPowerOnPump ? 'off' : 'on';
    socket.emit('pump_command', command);
    console.log(`Comando de bomba enviado: ${command}`);
  };

  // Manejar el encendido/apagado del dispensador de nutrientes (simulación)
  const handlePowerOnNutrients = () => {
    setIsPowerOnNutrients(!isPowerOnNutrients);
  };

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
                <img
                  className='sensor-container1-power'
                  src={isPowerOnPump ? '/assets/img/sensor/on.png' : '/assets/img/sensor/off.png'}
                  alt='Bomba de agua'
                />
              </button>
            </div>
            <div className='sensor-container1-items-item'>
              <div className='sensor-container1-actuators'>
                <h2>Nutrientes</h2><br />
                <img src={'/assets/img/sensor/mineral.png'} alt='Bomba de agua' />
              </div>
              <button onClick={handlePowerOnNutrients}>
                <img
                  className='sensor-container1-power'
                  src={isPowerOnNutrients ? '/assets/img/sensor/on.png' : '/assets/img/sensor/off.png'}
                  alt='Nutrientes'
                />
              </button>
            </div>
          </div>
        </div>

        <div className='sensor-container2'>
          {Object.keys(sensorData).map((key, index) => (
            <SensorBox
              key={index}
              title={key}
              value={sensorData[key as keyof SensorDataType].value}
              unit={sensorData[key as keyof SensorDataType].unit}
              imageUrl={sensorData[key as keyof SensorDataType].imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sensor;
