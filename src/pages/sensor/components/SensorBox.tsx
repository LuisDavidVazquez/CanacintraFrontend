import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import './SensorBox.css'

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface HistoricalData {
  timestamp: string;
  value: number;
}

interface SensorBoxProps {
  title?: string;
  value?: string | number;
  unit?: string;
  imageUrl?: string;
  historicalData: HistoricalData[];
}

function SensorBox({ title, value, unit, imageUrl, historicalData }: SensorBoxProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función para obtener el color según el tipo de sensor
  const getChartColors = (sensorTitle: string) => {
    switch(sensorTitle) {
      case 'Temperatura':
        return {
          borderColor: '#00acc1',
          backgroundColor: 'rgba(0, 172, 193, 0.3)'
        };
      case 'Humedad':
        return {
          borderColor: '#4caf50',
          backgroundColor: 'rgba(76, 175, 80, 0.3)'
        };
      case 'pH':
        return {
          borderColor: '#ff9800',
          backgroundColor: 'rgba(255, 152, 0, 0.3)'
        };
      case 'TDS':
        return {
          borderColor: '#9c27b0',
          backgroundColor: 'rgba(156, 39, 176, 0.3)'
        };
      default:
        return {
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.3)'
        };
    }
  };

  const colors = getChartColors(title || '');

  const chartData = {
    labels: historicalData.map(data => data.timestamp),
    datasets: [
      {
        label: `${title}`,
        data: historicalData.map(data => data.value),
        borderColor: colors.borderColor,
        backgroundColor: colors.backgroundColor,
        fill: true,
        tension: 0.4
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#666',
        bodyColor: '#666',
        borderColor: '#ddd',
        borderWidth: 1,
        padding: 10,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        title: {
          display: true,
          text: unit
        }
      },
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        title: {
          display: true,
          text: 'Tiempo'
        }
      }
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false
    }
  };

  return (
    <>
      <div className='sensorBox' onClick={() => setIsModalOpen(true)} style={{ cursor: 'pointer' }}>
        <div className='sensorBox-info'>
          <h1>{title}</h1><br />
          <h2>{value} {unit}</h2>
        </div>
        <div className='sensorBox-img'>
          <img src={imageUrl} alt={title} />
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsModalOpen(false)}>×</button>
            <h2>{title}</h2>
            <div className="chart-container">
              <Line options={chartOptions} data={chartData} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SensorBox