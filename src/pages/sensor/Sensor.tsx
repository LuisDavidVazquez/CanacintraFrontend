import { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
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

// Agregar esta interfaz para el historial
interface HistoricalData {
  timestamp: string;
  value: number;
}

// Add this type definition at the top of the file, after the imports
type SensorDataType = {
  [K in keyof typeof initialSensorData]: {
    value: number;
    unit: string;
    imageUrl: string;
    history?: HistoricalData[]; // Agregar el historial
  };
};

function Sensor() {
  const [sensorData, setSensorData] = useState<SensorDataType>(initialSensorData);
  const [isPowerOnPump, setIsPowerOnPump] = useState(false);
  const [isPowerOnNutrients, setIsPowerOnNutrients] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  // Conectar a WebSocket y manejar eventos
  useEffect(() => {
    // Inicializar Socket.io
    socketRef.current = io("http://localhost:8080", {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    const socket = socketRef.current;

    socket.on('connect', () => {
      console.log('Conectado al servidor WebSocket');
    });

    socket.on('connect_error', (error) => {
      console.log('Error de conexión:', error);
    });

    // Evento que actualiza los datos de los sensores
    socket.on('sensor_data', (data) => {
      console.log('Datos de sensores recibidos:', data);
      const timestamp = new Date().toLocaleTimeString();
      
      setSensorData((prevData) => {
        const newData = { ...prevData };
        
        // Actualizar cada sensor con su nuevo valor e historial
        Object.keys(data).forEach((key) => {
          if (key in newData) {
            const sensorKey = key as keyof SensorDataType;
            const currentHistory = newData[sensorKey].history || [];
            newData[sensorKey] = {
              ...newData[sensorKey],
              value: data[key] || newData[sensorKey].value,
              history: [...currentHistory, {
                timestamp,
                value: data[key] || newData[sensorKey].value
              }].slice(-20) // Mantener solo los últimos 20 registros
            };
          }
        });
        
        return newData;
      });
    });

    // Evento que actualiza el estado de la bomba
    socket.on('pump_status', (data) => {
      console.log('Estado de la bomba recibido:', data);
      setIsPowerOnPump(data.status === 'on');
    });

    return () => {
      if (socket) {
        socket.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  // Actualizar el manejador para usar socketRef
  const handlePowerOnPump = () => {
    const command = isPowerOnPump ? 'off' : 'on';
    socketRef.current?.emit('pump_command', command);
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
              historicalData={sensorData[key as keyof SensorDataType].history || []}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sensor;
